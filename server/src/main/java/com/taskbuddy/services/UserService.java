package com.taskbuddy.services;

import com.taskbuddy.dtos.auth.RegistrationRequest;
import com.taskbuddy.dtos.user.ChangePasswordRequest;
import com.taskbuddy.dtos.user.UserDto;
import com.taskbuddy.dtos.user.UserUpdateRequest;
import com.taskbuddy.entities.User;
import com.taskbuddy.exeptions.AuthorizationException;
import com.taskbuddy.exeptions.NotFoundException;
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

  private void validateAuthorization(Long id) {
    Long userId = jwtUtils.getCurrentUserId();
    if (!userId.equals(id)) throw new AuthorizationException("You are not authorized to perform this action");
  }

  public UserDto getCurrentUser() {
    return jwtUtils.getCurrentUser();
  }

  public User save(RegistrationRequest request) {
    User userEntity = userMapper.toEntity(request);
    userEntity.setPassword(passwordEncoder.encode(request.getPassword()));
    return userRepository.save(userEntity);
  }

  public User update(Long id, UserUpdateRequest request) {
    validateAuthorization(id);
    User existingUser = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
    existingUser.setFullname(request.getName());
    return userRepository.save(existingUser);
  }

  public void delete(Long id) {
    validateAuthorization(id);
    User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
    userRepository.delete(user);
  }

  public void changePassword(Long id, ChangePasswordRequest request) {
    validateAuthorization(id);
    User existingUser = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
    if (!passwordEncoder.matches(request.getOldPassword(), existingUser.getPassword()))
      throw new IllegalArgumentException("Old password is incorrect");
    existingUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
    userRepository.save(existingUser);
  }
}
