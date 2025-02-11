package com.vandus.main.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

import com.vandus.main.client.PythonAPIClient;

@Service
public class PythonAPIService {

    private final PythonAPIClient pythonAPI;

    public PythonAPIService(RestClient.Builder builder, @Value("${vandus.python.api.url}") String url) {
        RestClient restClient = builder.baseUrl(url).build();
        RestClientAdapter adapter = RestClientAdapter.create(restClient);
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(adapter).build();
        this.pythonAPI = factory.createClient(PythonAPIClient.class);
    }

    public String checkHealth() {
        return pythonAPI.checkHealth();
    } 
}