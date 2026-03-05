package com.hana8.demo.post;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PostDTO {
	@NotNull(groups = OnUpdate.class, message = "수정할 게시글 id를 입력하십쇼!!")
	// validated(PostDTO.Onupdate.class) 이렇게 불린 경우 만!! 검사 나머진 검사안함
	private Long id;

	@NotBlank(message = "제목은 필수값입니다.")
	private String title;

	private String content;

	@NotBlank
	private String writer;

	public interface OnUpdate {
	}

	public interface OnCreate {
	}
}
