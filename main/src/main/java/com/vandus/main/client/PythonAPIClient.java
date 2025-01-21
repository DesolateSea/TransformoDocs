package com.vandus.main.client;

import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

@HttpExchange(accept = "application/json")
public interface PythonAPIClient {
    
    @GetExchange("/health")
    String checkHealth();
}
