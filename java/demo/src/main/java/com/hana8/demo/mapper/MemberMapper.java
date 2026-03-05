package com.hana8.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.hana8.demo.dto.MemberDTO;
import com.hana8.demo.entity.Member;

@Mapper(componentModel = "spring")
public interface MemberMapper {
	// @Mapping(source = "nickname", target = "username") //dto에서 다르게 쓰는것을 버림
	@Mapping(target = "passwd", ignore = true)
	// passwd 빼고 넣어주세요
	MemberDTO toDTO(Member member);

	Member toEntity(MemberDTO dto);
}
