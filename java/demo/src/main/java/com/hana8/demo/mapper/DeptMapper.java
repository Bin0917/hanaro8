package com.hana8.demo.mapper;

import org.mapstruct.Mapper;

import com.hana8.demo.dto.DeptDTO;
import com.hana8.demo.entity.Dept;

@Mapper(componentModel = "spring")
public interface DeptMapper {
	DeptDTO toDTO(Dept dept);

	Dept toEntity(DeptDTO dto);
}
