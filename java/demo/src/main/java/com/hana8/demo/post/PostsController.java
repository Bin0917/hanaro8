package com.hana8.demo.post;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping({"/posts", "/posts/list"})
@RequiredArgsConstructor
public class PostsController {
	private final PostsService postService;

	private boolean isList(HttpServletRequest req) {
		return req.getRequestURI().contains("/list");
	}

	@GetMapping("")
	@ResponseBody // 걍 Controller 일때나 원래! 는 이걸 꼭 붙여주어야함
	public List<Posts> getPostList(HttpServletRequest req) {
		return postService.getPosts(isList(req));
	}

	@GetMapping("/{id}")
	public Posts getDetail(HttpServletRequest req, @PathVariable Long id) {
		return postService.getPost(id, isList(req));
	}

	@PostMapping("")
	public Posts addPost(HttpServletRequest req, @Validated(PostsDTO.OnCreate.class) @RequestBody PostsDTO post) {
		return postService.savePost(post, isList(req));
	}

	@PutMapping("/{id}")
	public Posts editPost(HttpServletRequest req, @PathVariable Long id,
		@Validated(PostsDTO.OnUpdate.class) @RequestBody PostsDTO post) {

		if (id == 0L)
			throw new IllegalArgumentException("게시글 id는 0보다 커야합니다");
		post.setId(id); // 수정해야 할 post의 id로 딱 붙이기
		return postService.editPost(post, isList(req));
	}

	@DeleteMapping("/{id}")
	public boolean postDelete(HttpServletRequest req, @PathVariable Long id) {
		return postService.removePost(id, isList(req));
	}
}
