package com.taskbuddy.dtos.task;

import com.taskbuddy.enums.TaskPriority;
import com.taskbuddy.enums.TaskStatus;
import lombok.Data;

@Data
public class TaskDto {
  private Long id;
  private String title;
  private String description;
  private TaskPriority priority;
  private TaskStatus status;
}
