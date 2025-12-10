package com.taskbuddy.repositories;

import com.taskbuddy.entities.SignupVerificationRecords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SignupVerificationRecordsRepository extends JpaRepository<SignupVerificationRecords, Long> {
  Optional<SignupVerificationRecords> findByUserEmail(String userEmail);
  Optional<SignupVerificationRecords> findByToken(String token);
  void deleteByToken(String token);
}