package org.hana8.trythis;

import static org.assertj.core.api.Assertions.*;
import static org.hana8.trythis.lambda.*;
import static org.hana8.trythis.lambda.filter;
import static org.hana8.trythis.lambda.map;

import java.util.List;

import org.junit.jupiter.api.Test;

class lambdaTest {

	private final List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);

	@Test
	void filterTest() {
		List<Integer> list = numbers.stream().filter(i -> i % 2 == 0).toList();

		// 일케 선언해서 쓸 수도 있음..!!
		MyPredicate<Integer> mp = i -> i % 2 == 0;
		List<Integer> evens = filter(numbers, mp); // [2,4,6,8]
		assertThat(evens).isEqualTo(list);

	}

	@Test
	void mapTest() {
		MyFunction<Integer, Integer> f = i -> i * i;
		List<Integer> squares = map(numbers, f);   // [1, 4, 9, …]

		assertThat(squares).isEqualTo(numbers.stream().map(i -> i * i).toList());
	}

	@Test
	void findTest() {
		Integer bigger3 = find(numbers, value -> value > 3);            // 4
		assertThat(bigger3).isEqualTo(numbers.stream().filter(i -> i > 3).findFirst().orElse(-1));
	}

	@Test
	void reducerTest() {
		int sum1 = reducer(numbers, 100, Integer::sum);                 // 145
		int sum11 = reducer(numbers, 1, (a, b) -> a * b);                 // 145
		int sum2 = reducer(numbers, 0, (a, b) -> a * b);                // 0
		int sum3 = reducer(numbers, 10, (a, b) -> a * b);               // 3628800
		assertThat(sum1).isEqualTo(145);
		assertThat(sum11).isEqualTo(numbers.stream().reduce(1, (a, b) -> a * b));
		assertThat(sum2).isEqualTo(numbers.stream().reduce(0, (a, b) -> (a * b)));
		// assertThat(sum3).isEqualTo(3628800);
		assertThat(sum3).isEqualTo(numbers.stream().reduce(10, (a, b) -> (a * b)));
	}
}
