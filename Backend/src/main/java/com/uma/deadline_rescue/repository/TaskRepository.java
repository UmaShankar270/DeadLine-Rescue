package com.uma.deadline_rescue.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uma.deadline_rescue.entity.Task;


public interface TaskRepository extends JpaRepository<Task, Long> {

}