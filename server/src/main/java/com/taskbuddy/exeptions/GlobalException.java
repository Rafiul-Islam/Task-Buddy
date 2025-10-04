package com.taskbuddy.exeptions;

import com.taskbuddy.dtos.common.ApiResponse;
import com.taskbuddy.payload.ApiResponseBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalException {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResponse<Object>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
    var firstErrorMessage = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
    log.error(firstErrorMessage);
    return ApiResponseBuilder.failed(HttpStatus.BAD_REQUEST, firstErrorMessage, null);
  }

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ApiResponse<Object>> handleNotFoundException(NotFoundException e) {
    log.error(e.getMessage());
    return ApiResponseBuilder.failed(HttpStatus.NOT_FOUND, e.getMessage(), null);
  }

  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<ApiResponse<Object>> handleAuthenticationException(AuthenticationException e) {
    log.error(e.getMessage());
    return ApiResponseBuilder.failed(HttpStatus.UNAUTHORIZED, e.getMessage(), null);
  }

  @ExceptionHandler(AuthorizationException.class)
  public ResponseEntity<ApiResponse<Object>> handleAuthorizationException(AuthorizationException e) {
    log.error(e.getMessage());
    return ApiResponseBuilder.failed(HttpStatus.FORBIDDEN, e.getMessage(), null);
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ApiResponse<Object>> handleRuntimeException(IllegalArgumentException e) {
    log.error(e.getMessage());
    return ApiResponseBuilder.failed(HttpStatus.BAD_REQUEST, e.getMessage(), null);
  }

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<ApiResponse<Object>> handleRuntimeException(RuntimeException e) {
    log.error(e.getMessage());
    return ApiResponseBuilder.failed(HttpStatus.BAD_REQUEST, e.getMessage(), null);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiResponse<Object>> handleException(Exception e) {
    log.error(e.getMessage());
    return ApiResponseBuilder.failed(HttpStatus.BAD_REQUEST, e.getMessage(), null);
  }

}
