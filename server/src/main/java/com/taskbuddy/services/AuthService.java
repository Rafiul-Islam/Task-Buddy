package com.taskbuddy.services;

import com.taskbuddy.dtos.auth.*;
import com.taskbuddy.entities.ResetPasswordRecords;
import com.taskbuddy.entities.SignupVerificationRecords;
import com.taskbuddy.entities.User;
import com.taskbuddy.exeptions.NotFoundException;
import com.taskbuddy.mappers.UserMapper;
import com.taskbuddy.utils.JwtUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthService {

  private final UserService userService;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final JwtUtils jwtUtils;
  private final UserMapper userMapper;
  private final PasswordResetEmailService passwordResetEmailService;
  private final ResetPasswordRecordsService resetPasswordRecordsService;
  private final PasswordEncoder passwordEncoder;
  private final SignupVerificationRecordsService signupVerificationRecordsService;
  private final SignupEmailService signupEmailService;

  @Value("${app.frontend-url}")
  String frontendUrl;

  @Value("${app.jwt.reset-token-expiration-in-ms}")
  long resetPasswordTokenExpiryTimeInMs;

  @Value("${app.jwt.signup-user-verification-token-expiration-in-ms}")
  long signupUserVerificationTokenExpiryTimeInMs;

  private void validatePasswordsEquality(String password, String confirmPassword) {
    if (!password.equals(confirmPassword)) {
      log.error("'{}' and '{}' Passwords do not match", password, confirmPassword);
      throw new IllegalArgumentException("Passwords do not match");
    }
  }

  private String generateResetPasswordLink(String token) {
    return frontendUrl + "/reset-password?reset-password-token=" + token;
  }

  private String generateSignupUserVerificationLink(String token) {
    return frontendUrl + "/login?email-verification-token=" + token;
  }

  private void sendResetPasswordEmail(String email, String token) {
    try {
      passwordResetEmailService.sendPasswordResetEmail(email, "TaskBuddy", generateResetPasswordLink(token));
      log.info("Password reset email sent to {}", email);
    } catch (Exception e) {
      log.error("Failed to send reset password email", e);
      throw new RuntimeException("Failed to send reset password email with");
    }
  }

  private void sendSignupUserVerificationEmail(String email, String token) {
    try {
      signupEmailService.sendSignupUserVerificationEmail(email, "TaskBuddy", generateSignupUserVerificationLink(token));
      log.info("Signup user verification email sent to {}", email);
    } catch (Exception e) {
      log.error("Failed to send signup user verification email", e);
      throw new RuntimeException("Failed to send signup user verification email");
    }
  }

  public void validateSignupUserVerificationToken(SignupUserVerificationLinkValidateRequest request) {
    try {
      String email = jwtUtils.validateAndExtractEmailForSignupUserVerificationToken(request.getToken());
      SignupVerificationRecords signupVerificationRecords = signupVerificationRecordsService.getByToken(request.getToken())
        .orElseThrow(() -> new NotFoundException("Signup user verification record not found"));
      log.info("Signup user verification record found for {}", email);

      if (!signupVerificationRecords.getUserEmail().equals(email) || !signupVerificationRecords.getToken().equals(request.getToken())) {
        log.error("Token {} or email {} does not match", request.getToken(), email);
        throw new BadCredentialsException("Invalid signup user verification token");
      }

    } catch (Exception e) {
      log.error("Invalid signup user verification token", e);
      throw new BadCredentialsException("Invalid signup user verification token");
    }
  }

  public void validateResetPasswordToken(ResetPasswordLinkValidateRequest request) {
    try {
      String email = jwtUtils.validateAndExtractEmailForResetPasswordToken(request.getToken());
      ResetPasswordRecords resetPasswordRecords = resetPasswordRecordsService.getByToken(request.getToken())
        .orElseThrow(() -> new NotFoundException("Reset password record not found"));
      log.info("Reset password record found for {}", email);

      if (!resetPasswordRecords.getUserEmail().equals(email) || !resetPasswordRecords.getToken().equals(request.getToken())) {
        log.error("Token {} or email {} does not match", request.getToken(), email);
        throw new BadCredentialsException("Invalid Reset password token");
      }

    } catch (Exception e) {
      log.error("Invalid reset password token", e);
      throw new BadCredentialsException("Invalid reset password token");
    }
  }

  @Transactional
  public void register(RegistrationRequest request) {
    Optional<User> user = userService.getUserByEmail(request.getEmail());
    if (user.isPresent() && user.get().isVerified()) {
      log.error("User ({}) already exists with this email", request.getEmail());
      throw new BadCredentialsException("An account already registered with this email");
    }

    String email = request.getEmail();

    Optional<SignupVerificationRecords> existing = signupVerificationRecordsService.getByEmail(email);

    // 1. If existing and still valid (not expired) → block resend
    if (existing.isPresent() && existing.get().getExpiresAt().isAfter(LocalDateTime.now())) {
      log.info("A signup user verification email has already been sent to {}", email);
      throw new BadCredentialsException("A signup user verification email has already been sent.");
    }

    // 2. If expired → delete old record
    existing.ifPresent(record -> {
      if (record.getExpiresAt().isBefore(LocalDateTime.now())) {
        log.info("Signup user verification record expired for {}", email);
        userService.delete(user.get().getId());
        log.info("User with email {} deleted successfully", email);
        resetPasswordRecordsService.deleteByToken(record.getToken());
        log.info("Signup user verification record deleted for {}", email);
      }
    });

    // 3. Generate new token
    String token = jwtUtils.generateSignupUserVerificationToken(email);
    SignupVerificationRecords record = SignupVerificationRecords.builder()
      .token(token)
      .userEmail(email)
      .expiresAt(LocalDateTime.now().plusSeconds(signupUserVerificationTokenExpiryTimeInMs / 1000))
      .build();

    signupVerificationRecordsService.save(record);
    log.info("Signup user verification record created for {}", email);

    // 4. Send email
    sendSignupUserVerificationEmail(email, token);

    userService.save(request);
    log.info("User ({}) registration successful", email);
  }

  public LoginResponse login(LoginRequest loginRequest) {
    authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        loginRequest.getEmail(),
        loginRequest.getPassword()
      )
    );
    User user = userService.getUserByEmail(loginRequest.getEmail()).orElseThrow(() -> new NotFoundException("User not found"));
    if (!user.isVerified()) {
      log.error("User ({}) is not verified", user.getEmail());
      throw new BadCredentialsException("User is not verified");
    }

    var accessToken = jwtService.generateAccessToken(user).toString();
    var refreshToken = jwtService.generateRefreshToken(user).toString();

    LoginResponse response = userMapper.convertTo(user, new LoginResponse());
    response.setAccessToken(accessToken);
    response.setRefreshToken(refreshToken);
    return response;
  }

  @Transactional
  public LoginResponse loginWithUserVerificationToken(LoginWithEmailVerificationTokenRequest loginRequest) {
    SignupUserVerificationLinkValidateRequest loginWithEmailVerificationTokenRequest = new SignupUserVerificationLinkValidateRequest();
    loginWithEmailVerificationTokenRequest.setToken(loginRequest.getToken());
    validateSignupUserVerificationToken(loginWithEmailVerificationTokenRequest);
    log.info("Signup user verification token validated successfully");

    authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        loginRequest.getEmail(),
        loginRequest.getPassword()
      )
    );

    User user = userService.getUserByEmail(loginRequest.getEmail()).orElseThrow(() -> new NotFoundException("User not found"));
    user.setVerified(true);
    userService.save(user);

    signupVerificationRecordsService.deleteByToken(loginRequest.getToken());

    var accessToken = jwtService.generateAccessToken(user).toString();
    var refreshToken = jwtService.generateRefreshToken(user).toString();

    LoginResponse response = userMapper.convertTo(user, new LoginResponse());
    response.setAccessToken(accessToken);
    response.setRefreshToken(refreshToken);
    return response;
  }

  public String refresh(RefreshTokenRequest request) {
    var jwt = jwtService.parseToken(request.getRefreshToken());

    if (jwt == null || !jwt.isExpired()) throw new BadCredentialsException("Invalid refresh token");


    var userId = jwt.getUserId();
    var user = userService.getUserById(userId).orElseThrow(() -> new NotFoundException("User not found"));

    return jwtService.generateAccessToken(user).toString();
  }

  @Transactional
  public void forgotPassword(ForgotPasswordRequest request) {
    Optional<User> user = userService.getUserByEmail(request.getEmail());
    if (user.isEmpty()) {
      log.error("User not found for email {}", request.getEmail());
      return;
    }

    String email = user.get().getEmail();

    Optional<ResetPasswordRecords> existing = resetPasswordRecordsService.getByEmail(email);

    // 1. If existing and still valid (not expired) → block resend
    if (existing.isPresent() && existing.get().getExpiresAt().isAfter(LocalDateTime.now())) {
      log.info("A reset email has already been sent to {}", email);
      throw new BadCredentialsException("A reset email has already been sent.");
    }

    // 2. If expired → delete old record
    existing.ifPresent(record -> {
      if (record.getExpiresAt().isBefore(LocalDateTime.now())) {
        log.info("Reset password record expired for {}", email);
        resetPasswordRecordsService.deleteByToken(record.getToken());
        log.info("Reset password record deleted for {}", email);
      }
    });

    // 3. Generate new token
    String token = jwtUtils.generateResetPasswordToken(email);
    ResetPasswordRecords record = ResetPasswordRecords.builder()
      .token(token)
      .userEmail(email)
      .expiresAt(LocalDateTime.now().plusSeconds(resetPasswordTokenExpiryTimeInMs / 1000))
      .build();

    resetPasswordRecordsService.save(record);
    log.info("New reset password record created for {}", email);

    // 4. Send email
    sendResetPasswordEmail(email, token);
  }

  @Transactional
  public void resetPassword(ResetPasswordRequest request) {
    validatePasswordsEquality(request.getNewPassword(), request.getConfirmPassword());
    log.info("Passwords validated successfully");

    ResetPasswordLinkValidateRequest resetPasswordLinkValidateRequest = new ResetPasswordLinkValidateRequest();
    resetPasswordLinkValidateRequest.setToken(request.getToken());
    validateResetPasswordToken(resetPasswordLinkValidateRequest);
    log.info("Reset password token validated successfully");

    String userEmail = jwtUtils.validateAndExtractEmailForResetPasswordToken(request.getToken());
    User existingUser = userService.getUserByEmail(userEmail).orElseThrow(() -> new BadCredentialsException("Invalid reset password token"));
    existingUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
    userService.save(existingUser);
    log.info("Password reset successfully for {}", userEmail);

    resetPasswordRecordsService.deleteByToken(request.getToken());
    log.info("Reset password record deleted for {}", userEmail);
  }
}
