package com.taskbuddy.services;

import com.taskbuddy.entities.ResetPasswordRecords;
import com.taskbuddy.repositories.ResetPasswordRecordsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResetPasswordRecordsService {

  private final ResetPasswordRecordsRepository resetPasswordRecordsRepository;

  public Optional<ResetPasswordRecords> getByEmail(String email) {
    return resetPasswordRecordsRepository.findByUserEmail(email);
  }

  public Optional<ResetPasswordRecords> getByToken(String token) {
    return resetPasswordRecordsRepository.findByToken(token);
  }

  public ResetPasswordRecords save(ResetPasswordRecords resetPasswordRecords) {
    return resetPasswordRecordsRepository.save(resetPasswordRecords);
  }

  public void deleteByToken(String token) {
    resetPasswordRecordsRepository.deleteByToken(token);
  }
}
