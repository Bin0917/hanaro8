package com.hana8.demo.mapper;

import org.springframework.stereotype.Component;

import com.hana8.demo.dto.MemberDTO;
import com.hana8.demo.entity.Member;

@Component
//dto 변형 매퍼를 따로 만들어줌 -> 과거방식 이지만 쓰는 곳도 많음
public class MyMemberMapper {
	public MemberDTO toDTO(Member m) {
		return MemberDTO.builder()
			.id(m.getId())
			.email(m.getEmail())
			.nickname(m.getNickname())
			.isActive(m.getIsActive())
			.bloodType(m.getBloodType())
			.createdAt(m.getCreatedAt())
			.updatedAt(m.getUpdatedAt()).build();
	}

	public Member toEntity(MemberDTO dto) {
		return Member.builder()
			.id(dto.getId())
			.email(dto.getEmail())
			.nickname(dto.getNickname())
			.isActive(dto.getIsActive())
			.bloodType(dto.getBloodType())
			.build();
	}
}

