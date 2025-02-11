package com.vandus.main.controller;

import com.vandus.main.service.PythonAPIService;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${vandus.api.public}")
@Tag(
    name="Public API for ML services",
    description="API endpoints for our ML services"
)
@RequiredArgsConstructor
public class PythonAPIController {
      
    private final PythonAPIService pythonApiService;

    @GetMapping("/health")
    public String checkHealth() {
        return pythonApiService.checkHealth();
    }
}
