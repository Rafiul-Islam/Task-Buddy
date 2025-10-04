package com.taskbuddy.entities;

import com.taskbuddy.enums.TaskPriority;
import com.taskbuddy.enums.TaskStatus;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tasks")
public class Task extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "title", nullable = false)
  private String title;

  @Column(name = "description", nullable = false, length = 512)
  private String description;

  @Column(name = "priority", nullable = false, length = 50)
  @Enumerated(EnumType.STRING)
  private TaskPriority priority;

  @Column(name = "status", nullable = false, length = 50)
  @Enumerated(EnumType.STRING)
  private TaskStatus status;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;
}
