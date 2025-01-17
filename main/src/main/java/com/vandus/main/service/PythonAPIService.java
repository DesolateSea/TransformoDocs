package com.vandus.main.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class PythonAPIService {

    private final WebClient pythonApi;

    public PythonAPIService(@Value("${vandus.python.api.url}") String pythonApiUrl) {
        this.pythonApi = WebClient.create(pythonApiUrl);
    }

    public String health() {
        return pythonApi.get().uri("/health").retrieve().bodyToMono(String.class).block();
    }
}
