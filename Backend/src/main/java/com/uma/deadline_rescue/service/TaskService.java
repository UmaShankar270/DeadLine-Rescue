package com.uma.deadline_rescue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uma.deadline_rescue.entity.Task;
import com.uma.deadline_rescue.repository.TaskRepository;
@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
    public Task updateTask(Long id, Task updatedTask) {

    Task existingTask = taskRepository.findById(id).orElse(null);

    if (existingTask == null) {
        return null;
    }

    existingTask.setTitle(updatedTask.getTitle());
existingTask.setDeadline(updatedTask.getDeadline());
existingTask.setStatus(updatedTask.getStatus());
existingTask.setEstimatedHours(updatedTask.getEstimatedHours());
existingTask.setPriority(updatedTask.getPriority());
existingTask.setDescription(updatedTask.getDescription());

    return taskRepository.save(existingTask);
}
}

