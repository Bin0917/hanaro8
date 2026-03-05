package com.hana8.demo.post;

import java.util.ArrayList;
import java.util.List;

// @Repository
public class PostRepositoryListImpl implements PostsRepository {
	List<Posts> posts = new ArrayList<>();

	@Override
	public List<Posts> findAllPosts() {
		return posts;
	}

	@Override
	public Posts findPostById(Long id) {
		return posts.stream().filter(p -> p.getId().equals(id)).findFirst().orElse(null);
	}

	@Override
	public Posts createPost(PostsDTO post) {
		Long id = posts.stream().mapToLong(Posts::getId).max().orElse(0) + 1;
		// post.setId(id);
		// posts.add(post);
		// return post;
		Posts newer = Posts.builder().id(id).title(post.getTitle()).content(post.getContent()).build();

		posts.add(newer);
		return newer;
	}

	@Override
	public Posts updatePost(PostsDTO post) {
		return posts.stream().filter(p -> p.getId().equals(post.getId())).findFirst().map(p -> {
			p.setId(post.getId());
			p.setTitle(post.getTitle());
			p.setContent(post.getContent());
			return p;
		}).orElse(null);
	}

	@Override
	public boolean deletePost(Long id) {
		return posts.stream().filter(p -> p.getId() == (long)id).findFirst()
			.map(p -> {
				posts.remove(p);
				return true;
			}).orElse(false);
	}
}
