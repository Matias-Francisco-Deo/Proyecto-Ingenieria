package com.reservo.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/public/**")
                .allowedOrigins("http://localhost:5174")
                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5174")
                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
        registry.addMapping("/auth/**")
                .allowedOrigins("http://localhost:5174")
                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}