package com.hana8.demo.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.hana8.demo.dto.DeptDTO;
import com.hana8.demo.dto.MemberDTO;
import com.hana8.demo.entity.Dept;
import com.hana8.demo.entity.Member;

// @Mapper(componentModel = "spring")
// public interface DeptMapper {
// 	DeptDTO toDTO(Dept dept);
//
// 	Dept toEntity(DeptDTO dto);
// }
@Mapper(componentModel = "spring", uses = {MemberMapper.class})
public interface DeptMapper {
	@Mapping(target = "deptMembers", ignore = true) // 부서장과 부서관목록은 상세에서만 나가야하니까 ignore
	@Mapping(target = "memberCount", expression = "java(dept.getDeptMembers().size())")
		// expression = java() => 자바 코드를 실행해서 나온 결과로 채워줘
		// !!! 오
	DeptDTO toDTO(Dept dept);

	Dept toEntity(DeptDTO dto);

	List<DeptDTO> toDTOList(List<Dept> depts);

	List<MemberDTO> toMemberDTOList(List<Member> depts);
}
