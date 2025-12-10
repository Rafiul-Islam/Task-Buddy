package com.taskbuddy.services;

import com.taskbuddy.entities.SignupVerificationRecords;
import com.taskbuddy.repositories.SignupVerificationRecordsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SignupVerificationRecordsService {

  private final SignupVerificationRecordsRepository signupVerificationRecordsRepository;

  public Optional<SignupVerificationRecords> getByEmail(String email) {
    return signupVerificationRecordsRepository.findByUserEmail(email);
  }

  public Optional<SignupVerificationRecords> getByToken(String token) {
    return signupVerificationRecordsRepository.findByToken(token);
  }

  public SignupVerificationRecords save(SignupVerificationRecords resetPasswordRecords) {
    return signupVerificationRecordsRepository.save(resetPasswordRecords);
  }

  public void deleteByToken(String token) {
    signupVerificationRecordsRepository.deleteByToken(token);
  }
}
