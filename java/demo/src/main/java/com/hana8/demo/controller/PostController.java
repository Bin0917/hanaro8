package com.hana8.demo.controller;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hana8.demo.dto.PostDTO;
import com.hana8.demo.dto.PostListDTO;
import com.hana8.demo.dto.ReplyDTO;
import com.hana8.demo.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
	private final PostService service;

	@GetMapping
	public List<PostDTO> getPosts(PostListDTO dto) {
		return service.getPosts(dto);
	}
	// @GetMapping
	// public List<PostDTO> getPosts(Pageable pager) {
	// 	return service.getPosts(pager);
	// }

	@GetMapping("/{id}")
	public PostDTO getPost(@PathVariable Long id) {
		return service.getPost(id);
	}

	@PostMapping
	public PostDTO createPost(@Validated(PostDTO.OnCreate.class) @RequestBody PostDTO postDTO) {
		return service.addPost(postDTO);
	}

	@PutMapping("/{id}")
	public PostDTO editPost(@PathVariable Long id, @Validated(PostDTO.OnUpdate.class) @RequestBody PostDTO postDTO) {
		// edit 시에는 지금 바뀌어있는 이 DTO를 넘겨주는 것
		postDTO.setId(id);
		return service.editPost(postDTO);
	}

	@DeleteMapping("/{id}")
	public int removePost(@PathVariable Long id) {
		return service.removePost(id);
	}

	@GetMapping("/{postId}/replies")
	List<ReplyDTO> getReplies(@PathVariable Long postId) {
		return service.getReplies(postId);
	}

	@GetMapping("/{postId}/replies/{id}")
	ReplyDTO getReply(@PathVariable Long postId, @PathVariable Long id) {
		return service.getReply(id);
	}

	@PostMapping("/{postId}/replies")
	ReplyDTO addReply(@PathVariable Long postId, @PathVariable ReplyDTO dto) {
		dto.setPostId(postId);
		return service.addReply(dto);
	}

	@PutMapping("/{postId}/replies")
	ReplyDTO editReply(@PathVariable Long postId, @PathVariable ReplyDTO dto) {
		dto.setPostId(postId);
		return service.editReply(dto);
	}

	@DeleteMapping("/{postId}/replies/{id}")
	int deleteReply(@PathVariable Long id) {
		return service.removeReply(id);
	}

}


