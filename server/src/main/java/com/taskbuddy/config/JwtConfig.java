package com.taskbuddy.config;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;
import java.security.Key;

@Configuration
@ConfigurationProperties(prefix = "spring.jwt")
@Data
public class JwtConfig {
  private String secret;
  private int accessTokenExpirationTime;
  private int refreshTokenExpirationTime;

  @Value("${app.jwt.reset-password-token-secret-key}")
  String RESET_PASSWORD_TOKEN_SECRET_KEY;

  public SecretKey getSecret() {
    return Keys.hmacShaKeyFor(secret.getBytes());
  }

  public SecretKey getSignInKey() {
    byte[] keyBytes = Decoders.BASE64.decode(RESET_PASSWORD_TOKEN_SECRET_KEY);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
