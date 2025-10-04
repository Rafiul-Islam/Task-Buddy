package com.taskbuddy.dtos.auth;

import lombok.Data;

@Data
public class LoginResponse {
  private Long id;
  private String fullname;
  private String email;
  private String accessToken;
  private String refreshToken;
}
