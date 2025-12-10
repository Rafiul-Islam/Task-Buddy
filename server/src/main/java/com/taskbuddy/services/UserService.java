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
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
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
    log.info("User {} is authorized to perform this action", userId);
  }

  public UserDto getCurrentUser() {
    return jwtUtils.getCurrentUser();
  }

  public User save(RegistrationRequest request) {
    User userEntity = userMapper.toEntity(request);
    userEntity.setPassword(passwordEncoder.encode(request.getPassword()));
    User response = userRepository.save(userEntity);
    log.info("User with email {} registered successfully", response.getEmail());
    return response;
  }

  public User save(User user) {
    User response = userRepository.save(user);
    log.info("User with email {} saved successfully", response.getEmail());
    return response;
  }

  public User update(Long id, UserUpdateRequest request) {
    validateAuthorization(id);
    User existingUser = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
    existingUser.setFullname(request.getFullname());
    User response = userRepository.save(existingUser);
    log.info("User with email {} updated successfully", response.getEmail());
    return response;
  }

  public void delete(Long id) {
    User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
    userRepository.delete(user);
    log.info("User with email {} deleted successfully", user.getEmail());
  }

  public void changePassword(Long id, ChangePasswordRequest request) {
    validateAuthorization(id);
    User existingUser = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
    if (!passwordEncoder.matches(request.getOldPassword(), existingUser.getPassword()))
      throw new IllegalArgumentException("Old password is incorrect");
    existingUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
    userRepository.save(existingUser);
    log.info("User with email {} changed password successfully", existingUser.getEmail());
  }

  public Optional<User> getUserById(Long userId) {
    return userRepository.findById(userId);
  }

  public Optional<User> getUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }
}
