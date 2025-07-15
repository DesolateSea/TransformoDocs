package com.vandus.main.dto;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OCRResponse {

    private String message;

    @JsonSetter(nulls = Nulls.AS_EMPTY)
    private List<String> text = new ArrayList<>();

    public Optional<String> getError() {
        if (message.startsWith("Error") || text.isEmpty())
            return Optional.of(message);
        return Optional.empty();
    }
}
