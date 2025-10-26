package com.taskbuddy.dtos.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateRequest {
  @NotBlank(message = "Name should not be blank")
  @Size(min = 3, max = 255, message = "Name must be between 3 and 255 characters long")
  private String fullname;
}
