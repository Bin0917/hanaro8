package com.hana8.demo.controller;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hana8.demo.dto.MemberDTO;
import com.hana8.demo.dto.MemberSearchDTO;
import com.hana8.demo.dto.UploadDTO;
import com.hana8.demo.service.FileService;
import com.hana8.demo.service.MemberImageService;
import com.hana8.demo.service.MemberService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;
	private final FileService fileService;
	private final MemberImageService memberImageService;

	@DeleteMapping("files/delete/{filename}")
	ResponseEntity<Void> deleteFile(@PathVariable String filename) {
		// Todo check the authentication

		fileService.delete(filename);
		return ResponseEntity.ok().build();
	}

	@PostMapping(value = "/files/upload/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	ResponseEntity<String> uploadFile(@RequestParam MultipartFile file, @PathVariable Long id) {
		return ResponseEntity.ok(memberImageService.upload(file, id));
	}

	@PostMapping(value = "/files/secure/upload/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	ResponseEntity<String> uploadSecureFile(@RequestParam MultipartFile file, @PathVariable Long id) {
		return ResponseEntity.ok(memberImageService.upload(file, true, id));
	}

	@GetMapping("files/download/{filename}")
	ResponseEntity<Resource> download(@PathVariable String filename,
		@RequestParam(defaultValue = "false") boolean inline, boolean isSecure) {

		if (isSecure) {
			// Todo check the file owner or administrator
			System.out.println("isSecure = " + filename + "?isSecure=true");
		}
		return memberImageService.download(filename, inline, isSecure);
	}

	@PostMapping(value = "/files/upload/mulitple", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	ResponseEntity<List<String>> uploadMultiple(@Valid UploadDTO dto) {
		List<String> uploadList = dto.getFiles().stream().map(f ->
			memberImageService.upload(f, dto.getMemberId())
		).toList();

		return ResponseEntity.ok(uploadList);
	}

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
