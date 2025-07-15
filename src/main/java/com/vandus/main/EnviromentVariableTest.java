package com.vandus.main;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EnviromentVariableTest implements ApplicationRunner {

    private final Environment env;

    @Override
    public void run(ApplicationArguments args) {
        String myEnv = env.getProperty("ENV_LOADED");
        if (myEnv != null) {
            System.out.println(">> Successfully loaded .env file");
        } else {
            System.out.println(">> .env file is not configured correctly");
        }
    }
}
