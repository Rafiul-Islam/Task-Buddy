package com.taskbuddy.dtos.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {
  @NotBlank(message = "Old Password is required")
  @Size(min = 6, max = 12, message = "Old Password must be between 6 and 12 characters long")
  @Pattern(regexp = ".*[a-z].*", message = "Old Password must contain at least one lowercase letter")
  @Pattern(regexp = ".*[A-Z].*", message = "Old Password must contain at least one uppercase letter")
  @Pattern(regexp = ".*\\d.*", message = "Old Password must contain at least one digit")
  @Pattern(regexp = ".*[^a-zA-Z0-9].*", message = "Old Password must contain at least one special character")
  private String oldPassword;

  @NotBlank(message = "New Password is required")
  @Size(min = 6, max = 12, message = "New Password must be between 6 and 12 characters long")
  @Pattern(regexp = ".*[a-z].*", message = "New Password must contain at least one lowercase letter")
  @Pattern(regexp = ".*[A-Z].*", message = "New Password must contain at least one uppercase letter")
  @Pattern(regexp = ".*\\d.*", message = "New Password must contain at least one digit")
  @Pattern(regexp = ".*[^a-zA-Z0-9].*", message = "New Password must contain at least one special character")
  private String newPassword;
}
