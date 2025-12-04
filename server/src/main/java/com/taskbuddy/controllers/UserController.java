package com.taskbuddy.controllers;

import com.taskbuddy.dtos.common.ApiResponse;
import com.taskbuddy.dtos.user.ChangePasswordRequest;
import com.taskbuddy.dtos.user.UserDto;
import com.taskbuddy.dtos.user.UserUpdateRequest;
import com.taskbuddy.entities.User;
import com.taskbuddy.mappers.UserMapper;
import com.taskbuddy.payload.ApiResponseBuilder;
import com.taskbuddy.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@Tag(name = "User")
public class UserController {

  private final UserService userService;
  private final UserMapper userMapper;

  @GetMapping
  @Operation(summary = "Get current user")
  public ResponseEntity<ApiResponse<UserDto>> getCurrentUser() {
    return ApiResponseBuilder.success(HttpStatus.OK, "User found", userService.getCurrentUser());
  }

  @PutMapping("/{userId}")
  @Operation(summary = "Update a user")
  public ResponseEntity<ApiResponse<UserDto>> update(@PathVariable("userId") Long userId, @Valid @RequestBody UserUpdateRequest request) {
    User updatedUser = userService.update(userId, request);
    UserDto userDto = userMapper.toDto(updatedUser);
    return ApiResponseBuilder.success(HttpStatus.OK, "User updated successfully", userDto);
  }

  @DeleteMapping("/{userId}")
  @Operation(summary = "Delete a user")
  public ResponseEntity<ApiResponse<Void>> delete(@PathVariable("userId") Long userId) {
    userService.delete(userId);
    return ApiResponseBuilder.success(HttpStatus.OK, "User deleted successfully", null);
  }

  @PostMapping("{userId}/change-password")
  @Operation(summary = "Change password")
  public ResponseEntity<Void> changePassword(@PathVariable(value = "userId") Long userId, @Valid @RequestBody ChangePasswordRequest request) {
    userService.changePassword(userId, request);
    return ResponseEntity.noContent().build();
  }

}
