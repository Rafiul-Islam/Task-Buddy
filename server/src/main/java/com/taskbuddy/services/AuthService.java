package com.taskbuddy.services;

import com.taskbuddy.dtos.auth.LoginRequest;
import com.taskbuddy.dtos.auth.LoginResponse;
import com.taskbuddy.dtos.auth.RegistrationRequest;
import com.taskbuddy.entities.User;
import com.taskbuddy.exeptions.NotFoundException;
import com.taskbuddy.mappers.UserMapper;
import com.taskbuddy.repositories.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
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
}
