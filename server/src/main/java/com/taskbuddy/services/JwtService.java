package com.taskbuddy.services;

import com.taskbuddy.config.JwtConfig;
import com.taskbuddy.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
public class JwtService {

  private final JwtConfig jwtConfig;

  public Jwt generateAccessToken(User user) {
    return generateToken(user, jwtConfig.getAccessTokenExpirationTime());
  }

  public Jwt generateRefreshToken(User user) {
    return generateToken(user, jwtConfig.getRefreshTokenExpirationTime());
  }

  private Jwt generateToken(User user, long tokenExpirationTime) {
    var claims = Jwts.claims()
      .setSubject(user.getId().toString())
      .add("email", user.getEmail())
      .add("fullname", user.getFullname())
      .issuedAt(new Date())
      .expiration(new Date(System.currentTimeMillis() + tokenExpirationTime))
      .build();

    return new Jwt(claims, jwtConfig.getSecret());
  }

  public Jwt parseToken(String token) throws JwtException {
    try {
      return new Jwt(getClaims(token), jwtConfig.getSecret());
    } catch (JwtException e) {
      log.error("Failed to parse token", e);
      throw e;
    }
  }

  private Claims getClaims(String token) {
    return Jwts.parser()
      .verifyWith(jwtConfig.getSecret())
      .build()
      .parseSignedClaims(token)
      .getPayload();
  }
}
