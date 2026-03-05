package com.hana8.demo.mapper;

import org.mapstruct.Mapper;

import com.hana8.demo.entity.Post;
import com.hana8.demo.post.PostDTO;

@Mapper(componentModel = "spring")
public interface PostMapper {
	PostDTO toPostDTO(Post post);

	Post toEntity(PostDTO dto);
}
