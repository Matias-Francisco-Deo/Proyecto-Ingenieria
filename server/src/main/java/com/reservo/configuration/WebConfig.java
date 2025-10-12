package com.reservo.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/public/**")
                .allowedOrigins("http://localhost:5173", "https://proyecto-ingenieria-mu.vercel.app", "https://proyecto-ingenieria-git-dev-matias-deos-projects.vercel.app")
                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173","https://proyecto-ingenieria-mu.vercel.app", "https://proyecto-ingenieria-git-fix-auth-matias-deos-projects.vercel.app")
                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
        registry.addMapping("/auth/**")
                .allowedOrigins("http://localhost:5173", "https://proyecto-ingenieria-mu.vercel.app", "https://proyecto-ingenieria-git-fix-auth-matias-deos-projects.vercel.app")
                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "https://proyecto-ingenieria-mu.vercel.app", "https://proyecto-ingenieria-git-fix-auth-matias-deos-projects.vercel.app")
                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Mapea /uploads/** a la carpeta local uploads/
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}