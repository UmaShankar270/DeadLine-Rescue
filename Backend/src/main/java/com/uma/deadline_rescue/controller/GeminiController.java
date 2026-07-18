package com.uma.deadline_rescue.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uma.deadline_rescue.dto.ChatRequest;
import com.uma.deadline_rescue.dto.ChatResponse;
import com.uma.deadline_rescue.dto.GeminiResponse;
import com.uma.deadline_rescue.entity.Task;
import com.uma.deadline_rescue.repository.TaskRepository;
import com.uma.deadline_rescue.service.GeminiService;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "*")
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping("/suggest")
    public GeminiResponse suggestPlan() {

        List<Task> tasks = taskRepository.findAll();

        StringBuilder prompt = new StringBuilder();

      prompt.append("""
You are an AI Productivity Coach.

Analyze all tasks and create a professional productivity report.

Rules

1. Ignore COMPLETED tasks.
2. HIGH priority first.
3. Then nearest deadline.
4. Then IN_PROGRESS.
5. Then PENDING.

Generate exactly in this format.

=========================

📅 TODAY'S PLAN

List today's most important tasks.

=========================

📆 WEEKLY PLAN

Monday

Tuesday

Wednesday

Thursday

Friday

Saturday

Sunday

Distribute work evenly.

=========================

🔥 PRIORITY ORDER

Rank tasks from highest to lowest.

=========================

📊 PRODUCTIVITY SCORE

Give a score out of 100.

Explain why.

=========================

⚠ RISKS

Mention overdue tasks.

Mention difficult tasks.

=========================

💡 TIPS

Give 5 productivity tips.

=========================

🏁 MOTIVATION

End with a motivational message.

Keep the response below 350 words.

Tasks

""");

        for (Task task : tasks) {

            prompt.append("--------------------------------\n");

            prompt.append("Title : ")
                    .append(task.getTitle())
                    .append("\n");

            prompt.append("Priority : ")
                    .append(task.getPriority())
                    .append("\n");

            prompt.append("Deadline : ")
                    .append(task.getDeadline())
                    .append("\n");

            prompt.append("Status : ")
                    .append(task.getStatus())
                    .append("\n");

            prompt.append("Estimated Hours : ")
                    .append(task.getEstimatedHours())
                    .append("\n");

            prompt.append("Description : ")
                    .append(task.getDescription())
                    .append("\n\n");

        }

        return new GeminiResponse(
                geminiService.generatePlan(
                        prompt.toString()
                )
        );

    }

    @PostMapping("/chat")
    public ChatResponse chat(
            @RequestBody ChatRequest request
    ) {

        List<Task> tasks =
                taskRepository.findAll();

        StringBuilder prompt =
                new StringBuilder();

     prompt.append("""
You are Deadline Rescue AI.

You are an AI Productivity Coach.

Rules:

• Maximum 120 words.
• Answer only what the user asks.
• Use headings.
• Use bullet points.
• Never explain your reasoning.
• Never repeat all tasks.
• Prioritize HIGH priority and nearest deadline.
• Keep responses simple.
• Use emojis.
• End with one motivational line.

Current Tasks:

""");
        for (Task task : tasks) {

            prompt.append("Title : ")
                    .append(task.getTitle())
                    .append("\n");

            prompt.append("Priority : ")
                    .append(task.getPriority())
                    .append("\n");

            prompt.append("Deadline : ")
                    .append(task.getDeadline())
                    .append("\n");

            prompt.append("Status : ")
                    .append(task.getStatus())
                    .append("\n");

            prompt.append("Hours : ")
                    .append(task.getEstimatedHours())
                    .append("\n\n");

        }

        prompt.append("""

User Question:


""");

        prompt.append(request.getQuestion());

        String answer =
                geminiService.chat(
                        prompt.toString()
                );

        return new ChatResponse(answer);

    }

}