package org.hana8;

import java.math.BigDecimal;
import java.util.function.BinaryOperator;

public enum Operation {
	PLUS('+', BigDecimal::add),
	MINUS('-', BigDecimal::subtract),
	MULTIPLY('*', BigDecimal::multiply),
	DIVIDE('/', BigDecimal::divide);

	private final char cmd; // 사칙연산 기호 저장 칸
	private final BinaryOperator<BigDecimal> fn;

	Operation(char cmd, BinaryOperator<BigDecimal> fn) {
		this.cmd = cmd;
		this.fn = fn;
	}

	public BigDecimal apply(BigDecimal v1, BigDecimal v2) {
		return fn.apply(v1, v2);
	}

	public boolean isMe(char cmd) {
		return this.cmd == cmd;
	}
}
