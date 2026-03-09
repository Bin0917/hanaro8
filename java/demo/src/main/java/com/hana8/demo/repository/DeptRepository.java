package com.hana8.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana8.demo.entity.Dept;

import jakarta.validation.constraints.NotBlank;

// 기본적으로 다 JpaRepo 를 쓴다
// jpa를 상속해서 얘는 Bean 임
public interface DeptRepository extends JpaRepository<Dept, Long> {

	List<Dept> findByCaptainName(@NotBlank String captainName);
}
