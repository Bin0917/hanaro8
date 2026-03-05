package com.hana8.demo.post;

import java.util.List;

public interface PostsRepository {

	List<Posts> findAllPosts();

	Posts findPostById(Long id);

	Posts createPost(PostsDTO post);

	Posts updatePost(PostsDTO post);

	boolean deletePost(Long id);
}
