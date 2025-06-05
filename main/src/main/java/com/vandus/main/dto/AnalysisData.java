package com.vandus.main.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class AnalysisData {
    private String summary;
    private List<String> keywords;
}
