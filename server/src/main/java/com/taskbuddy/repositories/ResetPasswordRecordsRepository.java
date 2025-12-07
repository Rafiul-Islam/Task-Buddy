package com.taskbuddy.repositories;

import com.taskbuddy.entities.ResetPasswordRecords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResetPasswordRecordsRepository extends JpaRepository<ResetPasswordRecords, Long> {
  Optional<ResetPasswordRecords> findByUserEmail(String userEmail);
  Optional<ResetPasswordRecords> findByToken(String token);
}