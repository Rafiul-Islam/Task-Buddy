package com.taskbuddy.controllers;

import com.taskbuddy.dtos.common.ApiResponse;
import com.taskbuddy.dtos.task.TaskCreatingRequest;
import com.taskbuddy.dtos.task.TaskDto;
import com.taskbuddy.entities.Task;
import com.taskbuddy.mappers.TaskMapper;
import com.taskbuddy.payload.ApiResponseBuilder;
import com.taskbuddy.services.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tasks")
@Tag(name = "Task")
public class TaskController {

  private final TaskService taskService;
  private final TaskMapper taskMapper;

  @GetMapping
  @Operation(summary = "Get all tasks")
  public ResponseEntity<ApiResponse<List<TaskDto>>> getAllTasks() {
    List<Task> tasks = taskService.findAll();
    List<TaskDto> taskDtos = taskMapper.toDtoList(tasks);
    return ApiResponseBuilder.success(HttpStatus.OK, "Tasks found", taskDtos);
  }

  @GetMapping("/{taskId}")
  @Operation(summary = "Get task by id")
  public ResponseEntity<ApiResponse<TaskDto>> getTaskById(@PathVariable Long taskId) {
    Task task = taskService.findById(taskId);
    TaskDto taskDto = taskMapper.toDto(task);
    return ApiResponseBuilder.success(HttpStatus.OK, "Task found", taskDto);
  }

  @PostMapping
  @Operation(summary = "Create task")
  public ResponseEntity<ApiResponse<TaskDto>> createTask(@Valid @RequestBody TaskCreatingRequest request) {
    Task task = taskService.save(request);
    TaskDto taskDto = taskMapper.toDto(task);
    return ApiResponseBuilder.success(HttpStatus.OK, "Task created", taskDto);
  }

  @PutMapping("/{taskId}")
  @Operation(summary = "Update task")
  public ResponseEntity<ApiResponse<TaskDto>> updateTask(@PathVariable Long taskId, @Valid @RequestBody TaskCreatingRequest request) {
    Task task = taskService.update(taskId, request);
    TaskDto taskDto = taskMapper.toDto(task);
    return ApiResponseBuilder.success(HttpStatus.OK, "Task updated", taskDto);
  }

  @DeleteMapping("/{taskId}")
  @Operation(summary = "Delete task")
  public ResponseEntity<ApiResponse<Void>> deleteTask(@PathVariable Long taskId) {
    taskService.delete(taskId);
    return ApiResponseBuilder.success(HttpStatus.OK, "Task deleted", null);
  }

}
