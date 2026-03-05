package com.hana8.demo.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.hana8.demo.common.validator.DateTime;

import lombok.Data;

@Data
public class MemberSearchDTO {
	private static final String fmt = "yyyy-MM-dd HH:mm";

	private Boolean isActive;
	private String nickname;
	@DateTime(fmt)
	private String dateTime;
	private String bloodType;

	public LocalDateTime parseDate(String date) {
		return LocalDateTime.parse(this.dateTime, DateTimeFormatter.ofPattern(fmt));
	}
}
