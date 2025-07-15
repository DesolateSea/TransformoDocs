package com.vandus.main.util.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vandus.main.dto.ExtractedFieldData;
import com.vandus.main.dto.AnalysisData;
import com.vandus.main.util.exception.ProcessingException;

public class Utility {

    public static Object parseFlexibleJson(String json) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(json);

            if (root.has("fields")) {
                return mapper.treeToValue(root, ExtractedFieldData.class);
            } else if (root.has("analysis")) {
                return mapper.treeToValue(root, AnalysisData.class);
            } else {
                return root; // Fallback
            }

        } catch (JsonProcessingException e) {
            throw new ProcessingException("Error parsing response JSON", e);
        }
    }
}
