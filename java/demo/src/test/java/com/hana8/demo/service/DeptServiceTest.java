package com.hana8.demo.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.hana8.demo.dto.DeptDTO;
import com.hana8.demo.entity.Dept;
import com.hana8.demo.entity.Member;
import com.hana8.demo.repository.DeptRepository;

@SpringBootTest
class DeptServiceTest {
	// dept 테스트에선 dept만 하라! member 나 다른거 가져와서 편하게 하려고 하면 규칙 위배임
	private static final Integer ID = 1;
	private static final Dept dept = Dept.builder()
		.id(1)
		.name("Dev")
		.captain(new Member(1L))
		.build();
	private static final List<Dept> depts = List.of(
		dept,
		Dept.builder().id(2).name("Sales").build(),
		Dept.builder().id(3).name("HR").build()
	);

	@MockitoBean // repo는 끝났다고 보고 목으로 가져옴
	DeptRepository deptRepository;

	@Autowired
	DeptService deptService;

	@BeforeEach
	void setUp() {
		given(deptRepository.findById(ID)).willReturn(Optional.ofNullable(dept));
		given(deptRepository.findAll()).willReturn(depts);

		// Mockito.when() ...
	}

	@Test
	void getDepts() {
		List<DeptDTO> depts = deptService.getDepts();
		assertThat(depts).isNotEmpty().hasSize(3)
			.extracting(DeptDTO::getName).contains("Dev", "HR", "Sales")
			.doesNotContain("Design");

		assertThatThrownBy(() -> deptService.getDept(99999999))
			.hasMessageContaining("not found");
	}

	@Test
	@DisplayName("Find a dept Test")
	void getDept() {
		DeptDTO dto = deptService.getDept(ID);
		// 필드값 만 비교라서 타입 달라도 ㄱㅊ
		// 아래 세가지 전부 같은 로직임
		// 서비스는 크게 테스트할게 없음 repo테스트가 젤 중요
		assertThat(dto)
			.isNotNull()
			.extracting(DeptDTO::getId, DeptDTO::getName)
			.containsExactlyInAnyOrder(1, dept.getName());

		assertThat(dto).isNotNull().satisfies(d -> {
			assertThat(d.getId()).isEqualTo(dept.getId());
			assertThat(d.getName()).isEqualTo(dept.getName());
		});

		assertThat(dto).hasFieldOrPropertyWithValue("id", 1)
			.hasFieldOrPropertyWithValue("name", dept.getName());
	}
}