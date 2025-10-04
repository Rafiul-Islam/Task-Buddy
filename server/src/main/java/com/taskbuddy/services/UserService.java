package com.taskbuddy.services;

import com.taskbuddy.dtos.auth.RegistrationRequest;
import com.taskbuddy.dtos.user.UserDto;
import com.taskbuddy.entities.User;
import com.taskbuddy.mappers.UserMapper;
import com.taskbuddy.repositories.UserRepository;
import com.taskbuddy.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final JwtUtils jwtUtils;
  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;

  public UserDto getCurrentUser() {
    return jwtUtils.getCurrentUser();
  }

  public User save(RegistrationRequest request) {
    User userEntity = userMapper.toEntity(request);
    userEntity.setPassword(passwordEncoder.encode(request.getPassword()));
    return userRepository.save(userEntity);
  }
}
