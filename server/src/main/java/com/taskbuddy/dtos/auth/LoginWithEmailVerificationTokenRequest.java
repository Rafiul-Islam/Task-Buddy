package com.taskbuddy.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginWithEmailVerificationTokenRequest {
  @NotBlank(message = "Token is required")
  private String token;

  @NotBlank(message = "Email is required")
  @Email(message = "Invalid email format")
  private String email;

  @NotBlank(message = "Password is required")
  @Size(min = 6, max = 12, message = "Password must be between 6 and 12 characters long")
  @Pattern(regexp = ".*[a-z].*", message = "Password must contain at least one lowercase letter")
  @Pattern(regexp = ".*[A-Z].*", message = "Password must contain at least one uppercase letter")
  @Pattern(regexp = ".*\\d.*", message = "Password must contain at least one digit")
  @Pattern(regexp = ".*[^a-zA-Z0-9].*", message = "Password must contain at least one special character")
  private String password;
}
