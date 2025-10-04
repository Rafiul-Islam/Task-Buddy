package com.taskbuddy.dtos.task;

import com.taskbuddy.enums.TaskPriority;
import com.taskbuddy.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TaskCreatingRequest {
  @NotBlank(message = "Title is required")
  @Size(max = 100, message = "Title must be less than 255 characters")
  private String title;

  @Size(max = 512, message = "Description must be less than 512 characters")
  private String description;

  @NotNull(message = "Priority is required")
  private TaskPriority priority;

  @NotNull(message = "Status is required")
  private TaskStatus status;
}
