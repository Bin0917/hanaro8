package com.hana8.demo.service;

import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.hana8.demo.dto.PostListDTO;
import com.hana8.demo.entity.Post;
import com.hana8.demo.entity.QPost;
import com.hana8.demo.mapper.PostMapper;
import com.hana8.demo.post.PostDTO;
import com.hana8.demo.repository.PostRepository;
import com.querydsl.core.BooleanBuilder;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
	private final PostRepository repository;
	private final PostMapper mapper;

	public List<PostDTO> getPosts(PostListDTO dto) {
		Pageable pager = PageRequest.of(dto.getPage(), dto.getPageSize(), Sort.by("id").descending());
		List<Post> posts = repository.findAll(pager).getContent();
		return posts.stream().map(mapper::toPostDTO).toList();
	}

	public List<PostDTO> searchPostsByTitle(PostDTO dto) {
		QPost post = QPost.post;
		BooleanBuilder bb = new BooleanBuilder();

		if (StringUtils.hasText(dto.getTitle())) {
			bb.and(post.title.stringValue().contains(dto.getTitle()));
		}
		return StreamSupport.stream(repository.findAll(bb).spliterator(), false).map(mapper::toPostDTO).toList();
	}

	public List<PostDTO> searchPostByTitleAndContent(PostDTO dto) {
		QPost post = QPost.post;
		BooleanBuilder bb = new BooleanBuilder();

		if (StringUtils.hasText(dto.getTitle())) {
			bb.and(post.title.stringValue().contains(dto.getTitle()));
		}
		if (StringUtils.hasText(dto.getContent())) {
			bb.and(post.body.stringValue().contains(dto.getContent()));
		}

		return StreamSupport.stream(repository.findAll(bb).spliterator(), false).map(mapper::toPostDTO).toList();
	}

	public PostDTO getPost(Long id) {
		return mapper.toPostDTO(repository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("there's no post!! with #%d".formatted(id))));
	}

	public PostDTO addPost(PostDTO postDTO) {
		return mapper.toPostDTO(repository.save(mapper.toEntity(postDTO)));
	}

	public PostDTO editPost(PostDTO postDTO) {
		// edit은 repo에서 현재 유저를 가져온 뒤, 내려보낸 DTO에 심어
		// 1. 새로운 객체 저장 + dto로 돌려보내주기 로 처리
		Post oldPost = repository.findById(postDTO.getId())
			.orElseThrow(() -> new IllegalArgumentException("Need id for edit"));

		oldPost.setTitle(postDTO.getTitle());
		oldPost.setBody(postDTO.getContent());
		oldPost.setWriter(postDTO.getWriter());

		// Dirty Checking 덕분에 save 안해도 되지만, 가독성을 위해 명시
		return mapper.toPostDTO(repository.save(oldPost));
	}

	public int removePost(Long id) {
		repository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("There's no Post about #%d".formatted(id)));
		repository.deletePost(id);
		return 1;
	}

}
