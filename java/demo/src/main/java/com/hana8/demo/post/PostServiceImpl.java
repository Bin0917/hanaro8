package com.hana8.demo.post;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.Setter;

// @Service
@RequiredArgsConstructor
@Setter
// @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE) // 이걸 넣어줘야 요청마다 리스트가 관리됨
public class PostServiceImpl implements PostsService {
	private final PostsRepository postRepository;
	private final PostsRepository postRepositoryList;

	// @Autowired
	// public PostServiceImpl(PostRepository postRepository, PostRepository postRepositoryList) {
	// 	this.postRepository = postRepository;
	// 	this.postRepositoryList = postRepositoryList;
	// }

	// private boolean isList;

	@Override
	public List<Posts> getPosts(boolean isList) {
		return isList ? postRepositoryList.findAllPosts() : postRepository.findAllPosts();
	}

	@Override
	public Posts getPost(Long id, boolean isList) {
		return isList ? postRepositoryList.findPostById(id) : postRepository.findPostById(id);
	}

	@Override
	public Posts savePost(PostsDTO post, boolean isList) {
		return isList ? postRepositoryList.createPost(post) : postRepository.createPost(post);
	}

	@Override
	public Posts editPost(PostsDTO post, boolean isList) {
		return isList ? postRepositoryList.updatePost(post) : postRepository.updatePost(post);
	}

	@Override
	public boolean removePost(Long id, boolean isList) {
		return isList ? postRepositoryList.deletePost(id) : postRepository.deletePost(id);
	}
}
