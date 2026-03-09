package com.hana8.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana8.demo.entity.Hashtag;

import jakarta.validation.constraints.NotBlank;

// 기본적으로 다 JpaRepo 를 쓴다
// jpa를 상속해서 얘는 Bean 임
public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
	// @Query("select h from Hashtag h inner join hashtagPosts p on h.id = p.hashtag where h.id = :id")
	// List<Hashtag> findByHashtagId(@Param("id") Long id);

	Optional<Hashtag> findByTag(@NotBlank String tag);
}
