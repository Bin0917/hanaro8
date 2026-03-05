package com.hana8.demo;

import org.jspecify.annotations.Nullable;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.hana8.demo.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InitLoader implements ApplicationRunner {
	private final PostRepository postRepository;

	@Override
	public void run(@Nullable ApplicationArguments args) {
		// moved to data.sql (2026-03-05 by Bean)
		// postRepository.save(new Post("Title입니다.", "lee"));
		// postRepository.save(new Post("22Title입니다.", "kim"));
		// postRepository.save(new Post("333Title입니다.", "park"));
	}
}
