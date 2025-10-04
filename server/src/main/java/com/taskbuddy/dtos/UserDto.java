package com.taskbuddy.dtos;

import lombok.Data;

@Data
public class UserDto {
  private Long id;
  private String fullname;
  private String email;
}
