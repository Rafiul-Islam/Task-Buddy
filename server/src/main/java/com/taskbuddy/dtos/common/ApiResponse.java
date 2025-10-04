package com.taskbuddy.dtos.common;

import lombok.Data;

@Data
public class ApiResponse<T> {
  private boolean success;
  private String message;
  private T payload;
}
