package com.hana8.demo.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeptListDTO {
	private Long id;
	private String name;
	private MemberDTO captain;
	private List<MemberDTO> deptMembers;
	private Long memberCount;
}
