package org.hana8.trythis;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

class CalcTest {
	// private final Calc c = new Calc(1, 2);
	static Calc c;
	static Calc c2;

	// 셋업개념으로 쓸 수 있음 beforeAll ㅇㅇ
	@BeforeAll
	static void setup() {
		c = new Calc(1, 2);
		c2 = new Calc(3, 5);
	}

	@Test
	void add() {
		assertEquals(3, c.add());
		assertEquals(8, c2.add());
		assertThat(c.add()).isEqualTo(3);
		assertThat(c2.add()).isEqualTo(8);
	}

	@Test
	void sub() {
		assertEquals(1, c.sub());
		assertEquals(2, c2.sub());

		assertThat(c.sub()).isEqualTo(1);
	}
}
