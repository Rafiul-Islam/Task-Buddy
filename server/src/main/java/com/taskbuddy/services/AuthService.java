package com.taskbuddy.services;

import com.taskbuddy.dtos.auth.*;
import com.taskbuddy.entities.User;
import com.taskbuddy.exeptions.NotFoundException;
import com.taskbuddy.mappers.UserMapper;
import com.taskbuddy.repositories.UserRepository;
import com.taskbuddy.utils.JwtUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthService {

  private final UserService userService;
  private final AuthenticationManager authenticationManager;
  private final UserRepository userRepository;
  private final JwtService jwtService;
  private final JwtUtils jwtUtils;
  private final UserMapper userMapper;

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
    User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new NotFoundException("User not found"));


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
    var user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));

    return jwtService.generateAccessToken(user).toString();
  }

  public String forgotPassword(@Valid ResetPasswordRequest request) {
    var user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new NotFoundException("User not found"));
    return jwtUtils.generateResetPasswordToken(user.getEmail());
  }
}
