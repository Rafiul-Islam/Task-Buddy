package com.taskbuddy.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class PasswordResetEmailService {

  private final JavaMailSender mailSender;

  @Value("${spring.mail.username}")
  String FROM_EMAIL;

  public void sendPasswordResetEmail(String toEmail, String userName, String resetPasswordLink) throws MessagingException, IOException {

    String htmlContent = loadHtmlTemplate();

    htmlContent = htmlContent.replace("{{userName}}", userName);
    htmlContent = htmlContent.replace("{{resetUrl}}", resetPasswordLink);

    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

    helper.setFrom(FROM_EMAIL);
    helper.setTo(toEmail);
    helper.setSubject("TaskBuddy password Reset Instructions");
    helper.setText(htmlContent, true);

    mailSender.send(message);
  }

  @Value("classpath:/templates/password-reset-email.html")
  private org.springframework.core.io.Resource templateResource;

  private String loadHtmlTemplate() throws IOException {
    try (java.io.InputStream inputStream = templateResource.getInputStream()) {
      return new String(inputStream.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
    }
  }
}
