package com.vandus.main.dto;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class DataAgentExtraction {
    protected String text;
    protected String documentType;
    protected Boolean analyzeOnly;
}
