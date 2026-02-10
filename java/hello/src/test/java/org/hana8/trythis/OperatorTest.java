package org.hana8.trythis;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Scanner;

import org.assertj.core.api.Assertions;
import org.hana8.Operation;
import org.junit.jupiter.api.Test;

class OperatorTest {

	@Test
	void getNumber() {
		Scanner sc = new Scanner("xx\n.\n2\n1\n");
		// 리턴값 없는 놈들은 걍 암것도 쓰면 안댐

		Assertions.assertThatThrownBy(() -> Operator.getNumber(sc))
			.isInstanceOf(IllegalStateException.class)
			.hasMessage("END");

		// 값 하나 씹기 (return 값이 없는 놈!)
		Operator.getNumber(sc);
		BigDecimal num1 = Operator.getNumber(sc);
		Assertions.assertThat(num1).isEqualTo(BigDecimal.valueOf(1));
		sc.close();
	}

	@Test
	void testGetNumber() {
		Scanner sc = new Scanner("1\n\n");
		BigDecimal one = BigDecimal.valueOf(1);
		BigDecimal defValue = BigDecimal.valueOf(100);
		Assertions.assertThat(Operator.getNumber(sc, 1, defValue)).isEqualTo(one);
		Assertions.assertThat(Operator.getNumber(sc, 1, defValue)).isEqualTo(defValue);
		sc.close();
	}

	@Test
	void getOperation() {
		Scanner sc = new Scanner("/\n+\n");
		BigDecimal v0 = BigDecimal.valueOf(0);
		BigDecimal v1 = BigDecimal.valueOf(1);
		BigDecimal v2 = BigDecimal.valueOf(2);

		Operation operDiv = Operator.getOperation(sc);
		Assertions.assertThat(operDiv.apply(v2, v1)).isEqualTo(v2.divide(v1, RoundingMode.HALF_UP));
		Assertions.assertThatThrownBy(() -> operDiv.apply(v2, v0))
			.isInstanceOf(ArithmeticException.class)
			.hasMessageContaining("/");
		//? 구조 이거 뭐임 ㄷㅅ
		Operation operPlus = Operator.getOperation(sc);

		Assertions.assertThat(operPlus).isEqualTo(Operation.PLUS);
		Assertions.assertThat(operPlus.apply(v1, v2)).isEqualTo(v1.add(v2));
		sc.close();
	}
}
