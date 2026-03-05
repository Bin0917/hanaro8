package com.hana8.demo.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hana8.demo.common.enums.BloodType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDTO {
	// @NotNull(groups = MemberDTO.OnCreate.class, message = "수정할 멤버 id를 입력하십쇼!!")
	private Long id;

	@NotBlank
	private String nickname;

	@Email
	@NotBlank
	private String email;

	@Size(min = 8, max = 16)
	private String passwd;
	private BloodType bloodType;
	private Boolean isActive;

	// 시간 포맷 간단히 가능
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime createdAt;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime updatedAt;

	public interface OnUpdate {
	}

	public interface OnCreate {
	}
}
