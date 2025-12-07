package com.taskbuddy.controllers;

import com.taskbuddy.dtos.auth.ForgotPasswordRequest;
import com.taskbuddy.dtos.auth.*;
import com.taskbuddy.dtos.common.ApiResponse;
import com.taskbuddy.payload.ApiResponseBuilder;
import com.taskbuddy.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication")
public class AuthController {

  private final AuthService authService;

  @PostMapping("/registration")
  @Operation(summary = "Register a new user")
  public ResponseEntity<ApiResponse<Void>> register(@RequestBody @Valid RegistrationRequest request) {
    authService.register(request);
    return ApiResponseBuilder.success(HttpStatus.CREATED, "User registered successfully", null);
  }

  @PostMapping("/login")
  @Operation(summary = "Login a user")
  public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
    LoginResponse response = authService.login(request);
    return ApiResponseBuilder.success(HttpStatus.OK, "Successfully Logged in", response);
  }

  @PostMapping("/refresh")
  @Operation(summary = "Refresh a user's access token")
  public ResponseEntity<ApiResponse<RefreshTokenResponse>> refresh(@RequestBody RefreshTokenRequest request) {
    var accessToken = authService.refresh(request);
    return ApiResponseBuilder.success(HttpStatus.OK, "New accessToken", new RefreshTokenResponse(accessToken));
  }

  @PostMapping("/forgot-password")
  @Operation(summary = "Forgot a user's password")
  public ResponseEntity<ApiResponse<Void>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
    authService.forgotPassword(request);
    return ApiResponseBuilder.success(HttpStatus.OK, "If any user registered with this email, an email has been sent to this email address with a reset password link", null);
  }

  @PostMapping("/validate-reset-password-link")
  @Operation(summary = "Validate a user's reset password link")
  public ResponseEntity<ApiResponse<Void>> validateResetPasswordLink(@Valid @RequestBody ResetPasswordLinkValidateRequest request) {
    authService.validateResetPasswordLink(request);
    return ApiResponseBuilder.success(HttpStatus.OK, "Reset password link is valid", null);
  }

}
