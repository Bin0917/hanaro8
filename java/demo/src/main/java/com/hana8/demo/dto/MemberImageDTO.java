package com.hana8.demo.dto;

import com.hana8.demo.entity.Member;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberImageDTO {
	private Long id;

	private String orgname;

	private String savedname;

	private String savedir;

	@NotNull
	private Member member;
}
