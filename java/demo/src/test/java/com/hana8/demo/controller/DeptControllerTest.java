package com.hana8.demo.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.hana8.demo.common.enums.BloodType;
import com.hana8.demo.dto.DeptDTO;
import com.hana8.demo.dto.MemberDTO;
import com.hana8.demo.entity.Member;
import com.hana8.demo.repository.MemberRepository;

import tools.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class DeptControllerTest {
	@Autowired
	MockMvc mvc;

	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	MemberRepository memberRepository;

	private static Long memberId; // 동적 ID 저장을 위한 변수

	@BeforeAll
	void setup() {
		// 부서장으로 사용할 멤버 생성 (ID를 지정하지 않음)
		Member saved = memberRepository.save(Member.builder()
			.nickname("captain")
			.email("captain@test.com")
			.bloodType(BloodType.A)
			.isActive(true)
			.build());
		memberId = saved.getId(); // DB에서 할당받은 실제 ID 저장
	}

	@Test
	@Order(1)
	void getDeptsTest() throws Exception {
		mvc.perform(get("/api/depts"))
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andDo(print());
	}

	@Test
	@Order(2)
	void addDeptTest() throws Exception {
		DeptDTO deptDTO = DeptDTO.builder()
			.name("HR")
			.captain(MemberDTO.builder().id(memberId).build()) // 동적 ID 사용
			.build();

		mvc.perform(post("/api/depts")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(deptDTO)))
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.id").exists())
			.andExpect(jsonPath("$.name").value("HR"))
			.andExpect(jsonPath("$.captain.id").value(memberId)) // 동적 ID 검증
			.andDo(print());
	}

	@Test
	@Order(3)
	void editDeptTest() throws Exception {
		// 먼저 부서를 하나 추가하거나 기존 ID 1번이 있다고 가정 (Order 순서상 2번에서 생성됨)
		DeptDTO dept = DeptDTO.builder()
			.id(1) // addDeptTest에서 생성된 ID가 1일 가능성이 큼
			.name("updated")
			.captain(MemberDTO.builder().id(memberId).build()) // 동적 ID 사용
			.build();

		mvc.perform(put("/api/depts/{id}", 1)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(dept)))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.name").value("updated"))
			.andExpect(jsonPath("$.captain.id").value(memberId))
			.andDo(print());
	}

	@Test
	@Order(4)
	void removeDeptTest() throws Exception {
		// delete - 성공했는지만 보거나, 남은 갯수를 봄 + 지울 녀석의 id만 있으면 됨. 객체 만들 필요는 없음
		mvc.perform(delete("/api/depts/{id}", 1))
			.andExpect(status().isOk())
			.andDo(print());
	}
}