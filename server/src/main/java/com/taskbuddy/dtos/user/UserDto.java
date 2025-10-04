package com.taskbuddy.dtos.user;

import lombok.Data;

@Data
public class UserDto {
  private Long id;
  private String fullname;
  private String email;
}
