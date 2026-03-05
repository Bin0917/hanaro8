package com.hana8.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hana8.demo.entity.Post;

import jakarta.transaction.Transactional;

// public interface PostRepository extends JpaRepository<Post, String> {
public interface PostRepository extends JpaRepository<Post, Long> {
	List<Post> findByTitleStartingWith(String title);

	@Query("delete from Post where id = :id")
	@Transactional
	@Modifying
	int deletePost(@Param("id") Long id);
}
