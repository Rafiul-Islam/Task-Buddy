package com.taskbuddy.utils;

import com.taskbuddy.config.JwtConfig;
import com.taskbuddy.dtos.user.UserDto;
import com.taskbuddy.services.Jwt;
import com.taskbuddy.services.JwtService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtils {

  private final JwtService jwtService;
  private final JwtConfig jwtConfig;
  private final HttpServletRequest request;

  @Value("${app.jwt.reset-token-expiration-in-ms}")
  String RESET_TOKEN_EXPIRATION;

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

  public String generateResetPasswordToken(String email) {
    return Jwts.builder()
      .subject(email)
      .issuedAt(new Date())
      .expiration(new Date(System.currentTimeMillis() + Long.parseLong(RESET_TOKEN_EXPIRATION)))
      .signWith(jwtConfig.getSignInKey(), SignatureAlgorithm.HS256)
      .compact();
  }

  public String extractEmail(String token) {
    return Jwts.parser()
      .verifyWith(jwtConfig.getSignInKey())
      .build()
      .parseSignedClaims(token)
      .getPayload()
      .getSubject();
  }
}