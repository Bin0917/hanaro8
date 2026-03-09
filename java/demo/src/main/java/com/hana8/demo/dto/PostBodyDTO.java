package com.hana8.demo.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostBodyDTO {
	private Long id;

	private String body;

	@JsonBackReference
	private PostDTO post;
}
