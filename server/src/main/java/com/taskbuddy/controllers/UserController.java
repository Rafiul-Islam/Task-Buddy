package com.taskbuddy.controllers;

import com.taskbuddy.dtos.common.ApiResponse;
import com.taskbuddy.dtos.user.UserDto;
import com.taskbuddy.payload.ApiResponseBuilder;
import com.taskbuddy.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@Tag(name = "User")
public class UserController {

  private final UserService userService;

  @GetMapping
  @Operation(summary = "Get current user")
  public ResponseEntity<ApiResponse<UserDto>> getCurrentUser() {
    return ApiResponseBuilder.success(HttpStatus.OK, "User found", userService.getCurrentUser());
  }

}
