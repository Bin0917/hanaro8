package com.hana8.demo.dto;

import java.time.LocalDate;

import com.hana8.demo.common.serializer.CardnoSerialize;
import com.hana8.demo.common.serializer.TelnoSerialize;
import com.hana8.demo.common.validator.Cardno;
import com.hana8.demo.common.validator.Telno;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import tools.jackson.databind.annotation.JsonSerialize;

@Data
@Builder
@AllArgsConstructor
public class User {
	private Long id; // int로 하면 null을 못받아서, 현 시점에선 int 쓰려면 초깃값에 id = 0 처럼 초기화 해주어야함. small, medium 이면 Integer, 더 크면 걍 Long

	@NotBlank
	private String username;
	@Email
	private String email;
	@Pattern(regexp = "^[A-Za-z0-9_.]+@hanabank.com$", message = "이메일 주소 형식이 올바르지 않습니다.")
	private String coMail;

	@Past
	private LocalDate birthday;

	@NotNull
	@Telno
	@JsonSerialize(using = TelnoSerialize.class)
	private String tel;

	@Cardno
	@JsonSerialize(using = CardnoSerialize.class)
	private String creditCard;

	public void replaceSpaceAndHyphen() {
		this.tel = this.tel.replaceAll("[\\s-]", "");

		if (this.creditCard != null)
			this.creditCard = this.creditCard.replaceAll("[\\s-]", "");
	}
}
