package com.vandus.main.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

public record OCRResponse(
    String message,
    @JsonSetter(nulls = Nulls.AS_EMPTY) List<String> text
) {
}