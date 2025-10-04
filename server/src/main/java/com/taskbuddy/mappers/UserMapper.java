package com.taskbuddy.mappers;

import com.taskbuddy.dtos.auth.RegistrationRequest;
import com.taskbuddy.dtos.user.UserDto;
import com.taskbuddy.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
  UserDto toDto(User user);
  User toEntity(RegistrationRequest request);
}
