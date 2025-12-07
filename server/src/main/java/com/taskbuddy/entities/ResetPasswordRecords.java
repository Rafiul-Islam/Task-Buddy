package com.taskbuddy.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "reset_password_records")
public class ResetPasswordRecords extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "user_email")
  private String userEmail;

  @Column(name = "token")
  private String token;

  @Column(name = "expires_at")
  private LocalDateTime expiresAt;
}
