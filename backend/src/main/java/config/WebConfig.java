package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Memungkinkan akses ke semua endpoint
                .allowedOrigins("http://localhost:5173","http://127.0.0.1:5500","http://127.0.0.1:5502","http://localhost:3000") // Frontend React
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Metode yang diizinkan
                .allowedHeaders("*") // Semua header diizinkan
                .allowCredentials(true); // Jika diperlukan untuk cookies/session
    }
}
