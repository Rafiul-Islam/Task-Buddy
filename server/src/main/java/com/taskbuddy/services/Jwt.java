package com.taskbuddy.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.Getter;

import javax.crypto.SecretKey;

@Getter
public class Jwt {
  private final Claims claims;
  private final SecretKey secretKey;

  public Jwt(Claims claims, SecretKey secretKey) {
    this.claims = claims;
    this.secretKey = secretKey;
  }

  public boolean isExpired() {
    return claims.getExpiration().after(new java.util.Date());
  }

  public long getUserId() {
    return Long.parseLong(claims.getSubject());
  }

  public String toString() {
    return Jwts.builder().claims(claims).signWith(secretKey).compact();
  }
}
