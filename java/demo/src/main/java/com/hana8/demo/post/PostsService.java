package com.hana8.demo.post;

import java.util.List;

public interface PostsService {

	List<Posts> getPosts(boolean isList);

	Posts getPost(Long id, boolean isList);

	Posts savePost(PostsDTO post, boolean isList);

	Posts editPost(PostsDTO post, boolean isList);

	boolean removePost(Long id, boolean isList);
}
