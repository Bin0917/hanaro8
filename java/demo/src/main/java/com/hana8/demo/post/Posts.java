package com.hana8.demo.post;

import org.springframework.beans.factory.annotation.Value;

import lombok.Builder;
import lombok.Data;

@Data
// @AllArgsConstructor
@Builder
public class Posts {
	private Long id;
	private String title;
	private String content;
	@Value("${post.default.writer}")
	private String writer;
}
