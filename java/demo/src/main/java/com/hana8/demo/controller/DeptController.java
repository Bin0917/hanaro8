package com.hana8.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hana8.demo.dto.DeptDTO;
import com.hana8.demo.service.DeptService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/depts")
@RequiredArgsConstructor
@Tag(name = "부서관리", description = "부서 상세에서는 ...")
public class DeptController {
	private final DeptService service;

	@GetMapping
	public List<DeptDTO> getDepts() {
		return service.getDepts();
	}
	// @GetMapping
	// public List<PostDTO> getPosts(Pageable pager) {
	// 	return service.getPosts(pager);
	// }

	@GetMapping("/{id}")
	@Tag(name = "부서 상세", description = "부서 세부 정보")
	@Operation(summary = "/api/depts/아이디 형식으로 부르세요", description = "부서id는 Integer 입니다.")
	@Parameter(name = "id", description = "부서ID", example = "1")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "요청이 성공했습니다.",
			content = @Content(mediaType = "application/json")),
		@ApiResponse(responseCode = "404", description = "해당부서가 없습니다",
			content = @Content(mediaType = "plain/text"))
	})
	ResponseEntity<?> getDept(@PathVariable Integer id) {
		try {
			return ResponseEntity.ok(service.getDept(id));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(404).body(e.getMessage());
		}
	}

	@PostMapping
	@Tag(name = "부서 등록")
	@Operation(summary = "URL 링크 설명")
	@io.swagger.v3.oas.annotations.parameters.RequestBody(
		description = "부서 정보",
		content = @Content(
			mediaType = "application/json",
			examples = @ExampleObject(value = """
				{
				  "name": "Devxxxx",
				  "captain": {
				    "id": 1
				  },
				  "deptMembers": [
				    {
				      "id": 2
				    }
				  ]
				}
				""")
		)
	)
	public DeptDTO addDept( // 파라미터를 input에 넣어줘야 스웨거에서 테스트할때, value로 바로 들어감
		@Valid @RequestBody DeptDTO dto) {
		return service.addDept(dto);
	}

	@PutMapping("/{id}")
	public DeptDTO editDept(@PathVariable Integer id,
		@Valid @RequestBody DeptDTO dto) {
		dto.setId(id);
		return service.editDept(dto);
	}

	@DeleteMapping("/{id}")
	public int removeDept(@PathVariable Integer id) {
		return service.removeDept(id);
	}
}


