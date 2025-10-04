package com.taskbuddy.services;

import com.taskbuddy.dtos.auth.RegistrationRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthService {

  private final UserService userService;

  public void register(RegistrationRequest request) {
    userService.save(request);
  }

}
