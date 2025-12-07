package com.taskbuddy.dtos.auth;

import lombok.Data;

@Data
public class ResetPasswordLinkValidateRequest {
  private String token;
}
