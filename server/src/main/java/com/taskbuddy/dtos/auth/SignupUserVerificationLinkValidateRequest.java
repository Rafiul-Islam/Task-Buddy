package com.taskbuddy.dtos.auth;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SignupUserVerificationLinkValidateRequest {
  @NotNull(message = "Token is required")
  private String token;
}
