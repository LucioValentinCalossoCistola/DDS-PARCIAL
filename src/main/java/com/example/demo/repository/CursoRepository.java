package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Alumno;
import com.example.demo.entity.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {

	void save(Optional<Curso> CursoToUpdate);
	List<Curso> findByNombre(String nombre);
	
}
