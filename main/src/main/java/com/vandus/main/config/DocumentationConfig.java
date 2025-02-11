package com.vandus.main.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DocumentationConfig {

    @Value("${vandus.api.public}")
    private String apiPublic;

    @Value("${vandus.api.private}")
    private String apiPrivate;

    @Value("${vandus.api.auth}")
    private String apiAuth;

    @Bean
    public OpenAPI apiDocumentation() {
        return new OpenAPI()
            .info(new Info()
                .title("TransformoDocs")
                .description("API for TransformoDocs. Also avaliable as Swagger UI at /swagger-ui")
                .version("1.0.0"));
    }

    @Bean
    public GroupedOpenApi authDocumentation() {
        return GroupedOpenApi.builder()
            .group("auth")
            .pathsToMatch(apiAuth + "/**")
            .build();
    }

    @Bean
    public GroupedOpenApi publicDocumentation() {
        return GroupedOpenApi.builder()
            .group("public")
            .pathsToMatch(apiPublic + "/**")
            .build();
    }

    @Bean
    public GroupedOpenApi privateDocumentation() {
        return GroupedOpenApi.builder()
            .group("private")
            .pathsToMatch(apiPrivate + "/**")
            .build();
    }
}
