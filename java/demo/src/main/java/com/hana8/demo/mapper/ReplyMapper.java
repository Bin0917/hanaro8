package com.hana8.demo.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.hana8.demo.dto.ReplyDTO;
import com.hana8.demo.entity.Reply;

@Mapper(componentModel = "spring", uses = {MemberMapper.class})
public interface ReplyMapper {
	// dto에서는 id 만 필요하니까 mapping을 잡아줌
	@Mapping(target = "postId", source = "post.id")
	ReplyDTO toReplyDTO(Reply reply);

	// @Mapping(target = "postId", ignore = true) // reply에는 post가 애초에 없으니까 걸 필요 없음
	@Mapping(target = "post", ignore = true)
	Reply toEntity(ReplyDTO dto);

	// 리스트를 줘서 하면 서비스에서 stream 안돌려도됨
	List<ReplyDTO> toReplyDTOList(List<Reply> replies);
}
