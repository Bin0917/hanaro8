package com.hana8.demo.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.hana8.demo.dto.MemberDTO;
import com.hana8.demo.entity.Member;

@Mapper(componentModel = "spring")
public interface MemberMapper {
	// @Mapping(source = "nickname", target = "username") //dto에서 다르게 쓰는것을 버림
	// 아래는 보여줘선 안되는 것들, 순환참조에 걸리는 것들을 제외시켜준다 (posts,captain등은 내부에 또 member를 부르므로 무시해버림)
	@Mapping(target = "passwd", ignore = true)
	@Mapping(target = "posts", ignore = true)
	@Mapping(target = "replyCount", ignore = true) // 이건 매퍼가 자동으로 계산할 수 없어서 비워둠. 순환 참조때문이 아님
	@Mapping(target = "captainDepts", ignore = true)
	@Mapping(target = "memberDepts", ignore = true)
	// passwd 빼고 넣어주세요
	MemberDTO toDTO(Member member);

	Member toEntity(MemberDTO dto);

	List<MemberDTO> toDTOList(List<Member> List);

	List<Member> toEntityList(List<MemberDTO> dtoList);
}
