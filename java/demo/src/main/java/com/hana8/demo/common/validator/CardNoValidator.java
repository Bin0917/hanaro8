package com.hana8.demo.common.validator;

import java.util.regex.Pattern;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CardNoValidator implements ConstraintValidator<Cardno, String> {
	private static final Pattern pattern = Pattern.compile("\\s{10,19}");

	// 세계표준 카드번호 체크 알고리즘(Luhn)
	private boolean luhn(String cardno) {
		int sum = 0;
		boolean alternate = false;

		for (int i = cardno.length() - 1; i >= 0; i--) {
			int digit = cardno.charAt(i) - '0';

			if (alternate) {
				digit *= 2;
				if (digit > 9)
					digit -= 9;
			}

			sum += digit;
			alternate = !alternate;
		}

		return sum % 10 == 0;
	}

	@Override
	public boolean isValid(String value, ConstraintValidatorContext ctx) {
		if (value == null || value.isBlank())
			return true;
		String replaceSpaceAndHyphen = value.replaceAll("[\\s-]", "");
		if (!pattern.matcher(replaceSpaceAndHyphen).matches())
			return false;
		return luhn(value);
	}
}
