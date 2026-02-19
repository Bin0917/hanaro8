package org.hana8.trythis;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class StreamKing {
	public static void main(String[] args) {
		List<Integer> list = List.of(1, 10, 6, 3, 3, 5, 4, 2, 7, 7, 9, 8, 10);

		System.out.println("짝수의 개수");
		System.out.println(list.stream().filter(i -> i % 2 == 0).count());

		System.out.println("각 숫자를 제곱");
		System.out.println(list.stream().map(i -> i * i));

		System.out.println("중복 제거");
		System.out.println(list.stream().collect(Collectors.toSet()));

		System.out.println("기본 정렬");
		System.out.println(list.stream().sorted());

		System.out.println("역순(내림차순) 정렬");
		System.out.println(list.stream().sorted((s1, s2) -> s2 - s1));

		System.out.println("처음 5개만 출력");
		System.out.println(list.stream().limit(5));

		System.out.println("처음 5개 건너뛰고 출력");
		System.out.println(list.stream().skip(5));

		System.out.println("값이 5보다 큰 것만 출력");
		System.out.println(list.stream().filter(i -> i > 5));

		System.out.println("1~10의 합계");
		System.out.println(IntStream.range(1, 10).reduce(0, Integer::sum));

		// 제미나이와 함께.. 이게 맞나?
		System.out.println("random 5개의 평균");
		System.out.println(
			list.stream()
				.sorted((a, b) -> Math.random() > 0.5 ? 1 : -1) // 랜덤하게 순서를 뒤섞음
				.limit(5)                                      // 5개만 컷!
				.collect(Collectors.averagingInt(n -> n)));
	}
}
