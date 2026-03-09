package com.hana8.demo.common.validator;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class DateTimeValidator implements ConstraintValidator<DateTime, String> {
	private DateTimeFormatter formatter;
	private boolean isLocalDate;

	@Override
	public void initialize(DateTime annotation) {
		String format = annotation.value();
		this.isLocalDate = format.length() <= 10;
		this.formatter = DateTimeFormatter.ofPattern(format);
	}

	@Override
	public boolean isValid(String value, ConstraintValidatorContext ctx) {
		if (value == null || value.isBlank())
			return true;

		try {
			if (isLocalDate) {
				// LocalDateTime.parse(value, this.formatter);
				LocalDate.parse(value, this.formatter);
			} else {
				LocalDateTime.parse(value, this.formatter);
			}
			return true;
		} catch (DateTimeParseException e) {
			e.printStackTrace(System.out);
			log.info(e.getMessage());
			return false;
		}
	}
}
