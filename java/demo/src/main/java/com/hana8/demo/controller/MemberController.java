package com.hana8.demo.controller;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hana8.demo.dto.MemberDTO;
import com.hana8.demo.dto.MemberSearchDTO;
import com.hana8.demo.service.MemberService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;

	@GetMapping("")
	List<MemberDTO> getMembers() {
		return memberService.getMembers();
	}

	@GetMapping("/search")
	List<MemberDTO> searchMembers(@Valid MemberSearchDTO dto) {
		return memberService.searchMembers(dto);
	}

	@GetMapping("/{id}")
	MemberDTO getMember(@PathVariable Long id) {
		return memberService.getMember(id);
	}

	@PostMapping("")
	MemberDTO registMember(@Validated(MemberDTO.OnCreate.class) @RequestBody MemberDTO memberDTO) {
		return memberService.registMember(memberDTO);
	}

	@PutMapping("/{id}")
	MemberDTO editMember(@PathVariable Long id, @Validated(MemberDTO.OnCreate.class) @RequestBody MemberDTO memberDTO) {
		memberDTO.setId(id);
		return memberService.editMember(memberDTO);
	}

	@DeleteMapping("/{id}")
	int withdrawMember(@PathVariable Long id) {
		return memberService.withdrawMember(id);
	}
}
