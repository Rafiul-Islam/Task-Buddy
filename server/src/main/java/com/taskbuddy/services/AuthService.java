package com.taskbuddy.services;

import com.taskbuddy.dtos.auth.*;
import com.taskbuddy.entities.ResetPasswordRecords;
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


  @Value("${app.frontend-url}")
  String frontendUrl;

  @Value("${app.jwt.reset-token-expiration-in-ms}")
  long resetPasswordTokenExpiryTimeInMs;

  private void validatePasswordsEquality(String password, String confirmPassword) {
    if (!password.equals(confirmPassword)) throw new IllegalArgumentException("Passwords do not match");
  }

  private String generateResetPasswordLink(String token) {
    return frontendUrl + "/auth/reset-password?reset-password-token=" + token;
  }

  private boolean sendResetPasswordEmail(String email, String token) {
    try {
      passwordResetEmailService.sendPasswordResetEmail(email, "TaskBuddy", generateResetPasswordLink(token));
    } catch (Exception e) {
      log.error("Failed to send reset password email", e);
      return false;
    }
    return true;
  }

  public void register(RegistrationRequest request) {
    userService.save(request);
  }

  public LoginResponse login(LoginRequest loginRequest) {
    authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        loginRequest.getEmail(),
        loginRequest.getPassword()
      )
    );
    User user = userService.getUserByEmail(loginRequest.getEmail()).orElseThrow(() -> new NotFoundException("User not found"));

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
    if (user.isEmpty()) return;

    String email = user.get().getEmail();

    Optional<ResetPasswordRecords> existing = resetPasswordRecordsService.getByEmail(email);

    // 1. If existing and still valid (not expired) → block resend
    if (existing.isPresent() && existing.get().getExpiresAt().isAfter(LocalDateTime.now())) {
      throw new BadCredentialsException("A reset email has already been sent.");
    }

    // 2. If expired → delete old record
    existing.ifPresent(record -> {
      if (record.getExpiresAt().isBefore(LocalDateTime.now())) {
        resetPasswordRecordsService.deleteByToken(record.getToken());
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

    // 4. Send email
    sendResetPasswordEmail(email, token);

    log.info("Password reset email sent to {}", email);
  }

  public void validateResetPasswordToken(ResetPasswordLinkValidateRequest request) {
    try {
      String email = jwtUtils.validateAndExtractEmail(request.getToken());
      ResetPasswordRecords resetPasswordRecords = resetPasswordRecordsService.getByToken(request.getToken())
        .orElseThrow(() -> new NotFoundException("Reset password record not found"));

      if (!resetPasswordRecords.getUserEmail().equals(email) || !resetPasswordRecords.getToken().equals(request.getToken())) {
        throw new BadCredentialsException("Invalid Reset password token");
      }

    } catch (Exception e) {
      throw new BadCredentialsException("Invalid reset password token");
    }
  }

  @Transactional
  public void resetPassword(ResetPasswordRequest request) {
    validatePasswordsEquality(request.getNewPassword(), request.getConfirmPassword());

    ResetPasswordLinkValidateRequest resetPasswordLinkValidateRequest = new ResetPasswordLinkValidateRequest();
    resetPasswordLinkValidateRequest.setToken(request.getToken());
    validateResetPasswordToken(resetPasswordLinkValidateRequest);

    String userEmail = jwtUtils.validateAndExtractEmail(request.getToken());
    User existingUser = userService.getUserByEmail(userEmail).orElseThrow(() -> new BadCredentialsException("Invalid reset password token"));
    existingUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
    userService.save(existingUser);
    resetPasswordRecordsService.deleteByToken(request.getToken());
  }
}
