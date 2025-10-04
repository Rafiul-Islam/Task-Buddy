package com.taskbuddy.mappers;

import com.taskbuddy.dtos.task.TaskCreatingRequest;
import com.taskbuddy.dtos.task.TaskDto;
import com.taskbuddy.entities.Task;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TaskMapper {
  TaskDto toDto(Task task);
  Task toEntity(TaskCreatingRequest request);
  Task convertTo(TaskCreatingRequest request, @MappingTarget Task task);
  List<TaskDto> toDtoList(List<Task> tasks);
}
