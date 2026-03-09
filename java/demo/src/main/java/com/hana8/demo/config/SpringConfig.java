package com.hana8.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

import com.hana8.demo.post.PostRepositoryImpl;
import com.hana8.demo.post.PostRepositoryListImpl;
import com.hana8.demo.post.PostServiceImpl;
import com.hana8.demo.post.PostsRepository;
import com.hana8.demo.post.PostsService;
import com.hana8.demo.service.HelpCallService;

@Configuration
@Lazy
@PropertySources({
	@PropertySource("classpath:db.properties"), // 상대경로: db.properties 해서 읽음
	@PropertySource("classpath:mail.properties"),
	@PropertySource("classpath:post.properties")
})
public class SpringConfig {
	@Bean(initMethod = "initialize", destroyMethod = "destroy")
	public HelpCallService helpCallService() {
		return new HelpCallService();
	}

	@Bean
	public PostsRepository postsRepository() {
		return new PostRepositoryImpl();
	}

	@Bean
	public PostsRepository postsListRepository() {
		return new PostRepositoryListImpl();
	}

	@Bean
	public PostsService postsService() {
		return new PostServiceImpl(postsRepository(), postsListRepository());
	}
}
