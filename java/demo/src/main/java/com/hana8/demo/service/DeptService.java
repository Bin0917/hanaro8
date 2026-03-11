package com.hana8.demo.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.hana8.demo.dto.DeptDTO;
import com.hana8.demo.entity.Dept;
import com.hana8.demo.entity.Member;
import com.hana8.demo.mapper.DeptMapper;
import com.hana8.demo.mapper.MemberMapper;
import com.hana8.demo.repository.DeptRepository;
import com.hana8.demo.repository.MemberRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeptService {
	private final DeptRepository deptRepository;
	private final MemberRepository memberRepository;
	private final DeptMapper deptMapper;
	private final MemberMapper memberMapper;

	public List<DeptDTO> getDepts() {
		return deptMapper.toDTOList(deptRepository.findAll());
	}

	public DeptDTO getDept(Integer deptId) {
		Dept dept = deptRepository.findById(deptId)
			.orElseThrow(() -> new IllegalArgumentException("DeptId not found!"));
		DeptDTO dto = deptMapper.toDTO(dept);
		dto.setDeptMembers(memberMapper.toDTOList(dept.getDeptMembers())); // 추가로 보여줘야하는놈만 set 해주면 된다.
		return dto;
	}

	// 다시 ㄱㄱ 어렵네 헷갈림
	public DeptDTO addDept(@Valid DeptDTO dto) {
		Dept dept = deptMapper.toEntity(dto);
		if (dto.getCaptain() != null) {
			Member captain = memberRepository.findById(dto.getCaptain().getId()).orElse(null);
			dept.setCaptain(captain);
		}

		// 해당 멤버에 맞는 부서회원들을 데리고옴 (?)
		List<Member> members = dto.getDeptMembers().stream().map(m ->
			memberRepository.findById(m.getId())
				.orElseThrow(() -> new IllegalArgumentException("Member is not found!"))
		).toList();
		dept.setDeptMembers(members);

		DeptDTO deptDTO = deptMapper.toDTO(deptRepository.save(dept));
		deptDTO.setDeptMembers(memberMapper.toDTOList(members));
		return deptDTO;
	}

	// edit도 다시해보기....
	public DeptDTO editDept(@Valid DeptDTO dto) {
		Dept oldDept = deptRepository.findById(dto.getId())
			.orElseThrow(() -> new IllegalArgumentException("DeptId not found!"));

		oldDept.setName(dto.getName());

		if (!Objects.equals(oldDept.getCaptain().getId(), dto.getCaptain().getId())) {
			oldDept.setCaptain(memberRepository.findById(dto.getCaptain().getId()).orElse(null));
		}

		// 다대다 맵핑 중간테이블의 연결을 싹 끊을 수 있음 = clear();
		// 아예 싹 도려내고 새로운 멤버들을 하나씩 이어주는 로직
		oldDept.getDeptMembers().clear();
		dto.getDeptMembers().forEach(m -> {
			Member member = memberRepository.findById(m.getId())
				.orElseThrow(() -> new IllegalArgumentException("Member is not found!"));
			oldDept.addMember(member);
		});

		DeptDTO deptDTO = deptMapper.toDTO(deptRepository.save(oldDept));
		deptDTO.setDeptMembers(memberMapper.toDTOList(oldDept.getDeptMembers()));

		return deptDTO;
	}

	public int removeDept(Integer id) {
		Dept oldDept = deptRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("DeptId not found!"));

		return deptRepository.deleteByDeptId(oldDept.getId());
	}
}
