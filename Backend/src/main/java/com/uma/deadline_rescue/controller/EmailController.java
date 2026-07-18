package com.uma.deadline_rescue.controller;

import com.uma.deadline_rescue.entity.Task;
import com.uma.deadline_rescue.repository.TaskRepository;
import com.uma.deadline_rescue.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
@CrossOrigin(origins = "*")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping("/send/{id}")
    public String sendReminder(

            @PathVariable Long id,

            @RequestParam String email

    ) {

        Task task = taskRepository.findById(id).orElse(null);

        if (task == null) {
            return "Task Not Found";
        }

        String subject = "Deadline Rescue Reminder";

        String body = """
Hello,

This is your task reminder.

Task : %s

Priority : %s

Status : %s

Deadline : %s

Estimated Hours : %d

Description : %s

Don't forget to complete it.

Regards,
Deadline Rescue
"""
.formatted(

task.getTitle(),

task.getPriority(),

task.getStatus(),

task.getDeadline(),

task.getEstimatedHours(),

task.getDescription()

);

        emailService.sendReminder(

                email,

                subject,

                body

        );

        return "Reminder Sent Successfully";

    }

}