package com.taskbuddy.mappers;

import com.taskbuddy.dtos.auth.LoginResponse;
import com.taskbuddy.dtos.auth.RegistrationRequest;
import com.taskbuddy.dtos.user.UserDto;
import com.taskbuddy.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {
  UserDto toDto(User user);
  User toEntity(RegistrationRequest request);
  LoginResponse convertTo(User user, @MappingTarget LoginResponse loginResponse);
}
