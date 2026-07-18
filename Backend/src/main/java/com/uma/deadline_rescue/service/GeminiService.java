package com.uma.deadline_rescue.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generatePlan(String prompt) {

        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                        + apiKey;

        Map<String, Object> body = createRequestBody(prompt);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(body, headers);

        try {

            ResponseEntity<Map> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            entity,
                            Map.class
                    );

            return extractText(response.getBody());

        } catch (Exception e) {

            return "⚠ Gemini is temporarily unavailable.\n\n"
                    + "Reason : " + e.getMessage();

        }

    }

    public String chat(String prompt) {

        return generatePlan(prompt);

    }

    private Map<String, Object> createRequestBody(String prompt) {

        Map<String, Object> text = new HashMap<>();
        text.put("text", prompt);

        List<Map<String, Object>> parts = new ArrayList<>();
        parts.add(text);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", parts);

        List<Map<String, Object>> contents = new ArrayList<>();
        contents.add(content);

        Map<String, Object> body = new HashMap<>();
        body.put("contents", contents);

        return body;

    }

    private String extractText(Map body) {

        List candidates =
                (List) body.get("candidates");

        Map candidate =
                (Map) candidates.get(0);

        Map content =
                (Map) candidate.get("content");

        List parts =
                (List) content.get("parts");

        Map first =
                (Map) parts.get(0);

        return first.get("text").toString();

    }

}