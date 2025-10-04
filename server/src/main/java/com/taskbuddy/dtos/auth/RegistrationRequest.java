package com.taskbuddy.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegistrationRequest {
  @NotBlank(message = "Full name is required")
  @Size(min = 3, max = 255, message = "Name must be between 3 and 255 characters long")
  private String fullname;

  @NotBlank(message = "Email is required")
  @Size(min = 3, max = 255, message = "Email must be between 3 and 255 characters long")
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












