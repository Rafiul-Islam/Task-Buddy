package com.taskbuddy.dtos.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ResetPasswordRequest {
  @NotNull(message = "Token is required")
  private String token;

  @NotBlank(message = "New password is required")
  @Size(min = 6, max = 12, message = "New Password must be between 6 and 12 characters long")
  @Pattern(regexp = ".*[a-z].*", message = "New Password must contain at least one lowercase letter")
  @Pattern(regexp = ".*[A-Z].*", message = "New Password must contain at least one uppercase letter")
  @Pattern(regexp = ".*\\d.*", message = "New Password must contain at least one digit")
  @Pattern(regexp = ".*[^a-zA-Z0-9].*", message = "New Password must contain at least one special character")
  private String newPassword;

  @NotBlank(message = "Confirm password is required")
  @Size(min = 6, max = 12, message = "Confirm Password must be between 6 and 12 characters long")
  @Pattern(regexp = ".*[a-z].*", message = "Confirm Password must contain at least one lowercase letter")
  @Pattern(regexp = ".*[A-Z].*", message = "Confirm Password must contain at least one uppercase letter")
  @Pattern(regexp = ".*\\d.*", message = "Confirm Password must contain at least one digit")
  @Pattern(regexp = ".*[^a-zA-Z0-9].*", message = "Confirm Password must contain at least one special character")
  private String confirmPassword;
}
