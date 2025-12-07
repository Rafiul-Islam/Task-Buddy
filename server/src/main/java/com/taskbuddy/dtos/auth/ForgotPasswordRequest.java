package com.taskbuddy.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ForgotPasswordRequest {
  @NotBlank(message = "Email is required")
  @Size(min = 3, max = 255, message = "Email must be between 3 and 255 characters long")
  @Email(message = "Invalid email format")
  private String email;
}
