package com.taskbuddy.dtos.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
  private Long id;
  private String fullname;
  private String email;
  private String accessToken;
  private String refreshToken;
}
