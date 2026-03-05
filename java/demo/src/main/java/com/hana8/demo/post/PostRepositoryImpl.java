package com.hana8.demo.post;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Primary;

// @Repository
@Primary
public class PostRepositoryImpl implements PostsRepository {
	Map<Long, Posts> posts = new HashMap<>();

	@Override
	public List<Posts> findAllPosts() {
		return posts.values().stream().toList();
	}

	@Override
	public Posts findPostById(Long id) {
		return this.posts.get(id);
	}

	@Override
	public Posts createPost(PostsDTO post) {
		// Long id = posts.stream().mapToLong(Post::getId).max().orElse(0) + 1;
		// post.setId(id);
		// posts.add(post);
		// return id;

		Long id = posts.keySet().stream().max(Long::compareTo).orElse(0L) + 1;
		// post.setId(id);
		// posts.put(id, post);

		Posts newpost = Posts.builder().id(id).title(post.getTitle()).content(post.getContent()).build();
		posts.put(id, newpost);
		return newpost;
	}

	@Override
	public Posts updatePost(PostsDTO post) {
		// return posts.stream().filter(p -> p.getId() == post.getId()).findFirst().map(p -> {
		// 	p.setId(post.getId());
		// 	p.setTitle(post.getTitle());
		// 	p.setContent(post.getContent());
		// 	return p;
		// }).orElse(null);

		Posts oldPost = posts.get(post.getId());
		oldPost.setTitle(post.getTitle());
		oldPost.setContent(post.getContent());
		return oldPost;
	}

	@Override
	public boolean deletePost(Long id) {
		// return posts.stream().filter(p -> p.getId() == (long)id).findFirst()
		// 	.map(p -> {
		// 		posts.remove(p);
		// 		return true;
		// 	}).orElse(false);

		if (!posts.containsKey(id))
			return false;
		posts.remove(id);

		return true;
	}
}
