package com.taskbuddy.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

  @Value("${app.frontend.urls}")
  private List<String> frontendUrls;

  @Value("${app.supported-http-methods}")
  private List<String> supportedHttpMethods;

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(frontendUrls);
    configuration.setAllowedMethods(supportedHttpMethods);
    configuration.setAllowedHeaders(List.of("*"));
    configuration.setAllowCredentials(true); // If you need cookies/auth headers

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
