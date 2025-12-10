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
@Table(name = "signup_verification_records")
public class SignupVerificationRecords extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "user_email")
  private String userEmail;

  @Column(name = "token", unique = true)
  private String token;

  @Column(name = "expires_at")
  private LocalDateTime expiresAt;
}
