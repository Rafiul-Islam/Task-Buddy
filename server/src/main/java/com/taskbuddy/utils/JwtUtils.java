package com.taskbuddy.utils;

import com.taskbuddy.dtos.UserDto;
import com.taskbuddy.services.Jwt;
import com.taskbuddy.services.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtUtils {

  private final JwtService jwtService;
  private final HttpServletRequest request;

  private String getCurrentToken() {
    String authHeader = request.getHeader("Authorization");
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    return authHeader.substring(7);
  }

  private Jwt getJwt() {
    return jwtService.parseToken(getCurrentToken());
  }

  public Long getCurrentUserId() {
    return getJwt().getUserId();
  }

  public String getCurrentUserEmail() {
    return getJwt().getClaims().get("email", String.class);
  }

  public String getCurrentUserName() {
    return getJwt().getClaims().get("fullname", String.class);
  }

  public UserDto getCurrentUser() {
    UserDto user = new UserDto();
    user.setId(getCurrentUserId());
    user.setFullname(getCurrentUserName());
    user.setEmail(getCurrentUserEmail());
    return user;
  }
}