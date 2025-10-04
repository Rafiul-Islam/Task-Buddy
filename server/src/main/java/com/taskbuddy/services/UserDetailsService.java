package com.taskbuddy.services;



import com.taskbuddy.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    var existingUser = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    return new User(
      existingUser.getEmail(),
      existingUser.getPassword(),
      Collections.emptyList()
    );
  }
}
