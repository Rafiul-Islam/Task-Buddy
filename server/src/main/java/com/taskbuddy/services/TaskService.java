package com.taskbuddy.services;

import com.taskbuddy.dtos.task.TaskCreatingRequest;
import com.taskbuddy.entities.Task;
import com.taskbuddy.entities.User;
import com.taskbuddy.exeptions.AuthorizationException;
import com.taskbuddy.exeptions.NotFoundException;
import com.taskbuddy.mappers.TaskMapper;
import com.taskbuddy.repositories.TaskRepository;
import com.taskbuddy.utils.JwtUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class TaskService {
  private final TaskRepository taskRepository;
  private final JwtUtils jwtUtils;
  private final TaskMapper taskMapper;
  private final UserService userService;

  private void validateAuthorizationToAccessTheTask(Task task) {
    if (!task.getUser().getId().equals(jwtUtils.getCurrentUserId()))
      throw new AuthorizationException("You are not authorized to perform this action");
  }

  public List<Task> findAll() {
    Long userId = jwtUtils.getCurrentUserId();
    return taskRepository.findAllTasksByUserId(userId);
  }

  public Task findById(Long id) {
    Task task = taskRepository.findById(id).orElseThrow(() -> new NotFoundException("Task not found"));
    validateAuthorizationToAccessTheTask(task);
    return task;
  }

  @Transactional
  public Task save(TaskCreatingRequest request) {
    Long userId = jwtUtils.getCurrentUserId();
    User user = userService.getUserById(userId).orElseThrow(() -> new NotFoundException("User not found"));

    Task taskEntity = taskMapper.toEntity(request);
    taskEntity.setUser(user);

    Task response = taskRepository.save(taskEntity);
    log.info("Task created successfully with taskID: {} for userID: {}", response.getId(), userId);
    return response;
  }

  public Task update(Long id, TaskCreatingRequest request) {
    Task existingTask = findById(id);
    validateAuthorizationToAccessTheTask(existingTask);
    Task updatedTask = taskMapper.convertTo(request, existingTask);
    Task response = taskRepository.save(updatedTask);
    log.info("Task updated successfully for task ID: {}", id);
    return response;
  }

  public void delete(Long id) {
    Task existingTask = findById(id);
    validateAuthorizationToAccessTheTask(existingTask);
    taskRepository.delete(existingTask);
    log.info("Task deleted successfully for task ID: {}", id);
  }
}
