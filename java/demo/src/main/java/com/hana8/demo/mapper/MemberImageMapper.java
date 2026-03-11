package com.hana8.demo.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.hana8.demo.dto.MemberImageDTO;
import com.hana8.demo.entity.MemberImage;

@Mapper(componentModel = "spring")
public interface MemberImageMapper {
	MemberImage toEntity(MemberImageDTO dto);

	MemberImageDTO toDTO(MemberImage memberImage);

	List<MemberImageDTO> toDTOList(List<MemberImage> byMemberId);
}
