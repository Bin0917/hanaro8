package com.hana8.demo.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.hana8.demo.dto.MemberDTO;
import com.hana8.demo.dto.MemberSearchDTO;
import com.hana8.demo.entity.Member;
import com.hana8.demo.entity.QMember;
import com.hana8.demo.mapper.DeptMapper;
import com.hana8.demo.mapper.MemberMapper;
import com.hana8.demo.mapper.PostMapper;
import com.hana8.demo.repository.DeptRepository;
import com.hana8.demo.repository.MemberRepository;
import com.hana8.demo.repository.PostRepository;
import com.hana8.demo.repository.ReplyRepository;
import com.querydsl.core.BooleanBuilder;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final PostRepository postRepository;
	private final ReplyRepository replyRepository;
	private final MemberMapper mapper;
	private final PostMapper postMapper;
	private final DeptRepository deptRepository;
	private final DeptMapper deptMapper;

	public List<MemberDTO> searchMembers(MemberSearchDTO dto) {
		System.out.println("dto = " + dto);
		QMember member = QMember.member;

		BooleanBuilder bb = new BooleanBuilder();
		if (dto.getNickname() != null)
			bb.and(member.isActive.eq(dto.getIsActive()));

		if (StringUtils.hasText(dto.getBloodType()))
			bb.and(member.bloodType.stringValue().contains(dto.getBloodType()));

		if (StringUtils.hasText(dto.getNickname()))
			bb.and(member.nickname.stringValue().contains(dto.getNickname()));

		if (StringUtils.hasText(dto.getDateTime())) {
			bb.and(member.updatedAt.after(
				LocalDateTime.parse(dto.getDateTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
			));
		}
		// List<Member> data = (List<Member>)repository.findAll(bb));
		// return data.stream().map(mapper::toDTO).toList();

		// 이터러블 타입을 스트림으로 -> StreamSupport / spliterator -> 스트림으로 바꾸기위한 선수작업 느낌
		return StreamSupport.stream(memberRepository.findAll(bb).spliterator(), false)
			.map(mapper::toDTO)
			.toList();

	}

	public List<MemberDTO> getMembers() {
		List<Member> members = memberRepository.findAll();
		return members.stream().map(mapper::toDTO).toList();

	}

	public MemberDTO getMember(Long id) {
		Member member = memberRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("Member #%d is not found".formatted(id)));

		MemberDTO dto = mapper.toDTO(member);
		dto.setPosts(postRepository.findByWriterId(id).stream().map(postMapper::toPostDTO).toList());
		dto.setReplyCount(replyRepository.countByReplierId(id));
		dto.setCaptainDepts(member.getCaptainDepts().stream().map(deptMapper::toDTO).toList());
		dto.setMemberDepts(member.getMemberDepts().stream().map(deptMapper::toDTO).toList());
		return dto;
	}

	public MemberDTO registMember(MemberDTO memberDTO) {
		return mapper.toDTO(memberRepository.save(mapper.toEntity(memberDTO)));
	}

	public MemberDTO editMember(MemberDTO memberDTO) {
		// return mapper.toDTO(memberRepository.save(mapper.toEntity(memberDTO)));
		Member oldMember = memberRepository.findById(memberDTO.getId())
			.orElseThrow(() -> new IllegalArgumentException("Member #%d is not found".formatted(memberDTO.getId())));

		oldMember.setNickname(memberDTO.getNickname());
		oldMember.setEmail(memberDTO.getEmail());
		oldMember.setIsActive(memberDTO.getIsActive());
		oldMember.setBloodType(memberDTO.getBloodType());
		oldMember.setPasswd(memberDTO.getPasswd());

		return mapper.toDTO(memberRepository.save(oldMember));
	}

	public int withdrawMember(Long id) {
		memberRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("Member #%d is not found".formatted(id)));

		memberRepository.deleteById(id);
		return 1;
	}

}
