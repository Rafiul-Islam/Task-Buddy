package com.taskbuddy.payload;


import com.taskbuddy.dtos.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ApiResponseBuilder {
  public static <T> ResponseEntity<ApiResponse<T>> success(HttpStatus status, String message, T data) {
    ApiResponse<T> response = new ApiResponse<T>();
    response.setSuccess(true);
    response.setMessage(message);
    response.setPayload(data);
    return ResponseEntity.status(status).body(response);
  }

  public static <T> ResponseEntity<ApiResponse<T>> failed(HttpStatus status, String message, T data) {
    ApiResponse<T> response = new ApiResponse<T>();
    response.setSuccess(false);
    response.setMessage(message);
    response.setPayload(data);
    return ResponseEntity.status(status).body(response);
  }
}
