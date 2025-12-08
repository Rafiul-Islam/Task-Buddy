package com.taskbuddy.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

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
    log.debug("Password reset email sent from {}", FROM_EMAIL);
    log.info("Password reset email sent to {}", toEmail);
  }

  private String loadHtmlTemplate() throws IOException {
    return new String(Files.readAllBytes(Paths.get("src/main/resources/templates/password-reset-email.html")));
  }
}
