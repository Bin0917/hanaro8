package org.hana8;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamPlay {
	public static void main(String[] args) {
		List<String> list = Arrays.asList("JS", "TS", "Java", "JS");
		List<String> list1 = list.stream().toList();
		List<String> list2 = list.stream().collect(Collectors.toList());
		String collect = list.stream().collect(Collectors.joining(", "));
		String collect2 = String.join(", ", list);
		// 메소드 참조 -> :: 가능
		list.forEach(System.out::println);
		// list.stream().forEach(System.out::println);

		System.out.println("list.stream().collect(Collectors.groupingBy(String::length)) = " + list.stream()
			.collect(Collectors.groupingBy(String::length)));

		long count = list.stream().map(String::length).count();
		System.out.println("count = " + count);

		Stream<Integer> stream = list.stream().map(String::length);
		IntStream intStream = list.stream().mapToInt(String::length); // mapToInt, Long, Double 들만 sum 이 있음!!

		System.out.println(
			"list.stream().mapToInt(String::length).sum() = " + list.stream().mapToInt(String::length).sum());

		IntStream intStream1 = IntStream.rangeClosed(1, 10);
		System.out.println("intStream1.sum() = " + intStream1.sum());

		// list -(stream)-> Set -(stream)-> 컬렉트 & 맵핑 시작!. 두번 거친 느낌
		// Map<String, Integer> map1 = list.stream().collect(Collectors.toSet()).stream().collect(Collectors.toMap(s -> s, String::length));
		Map<String, Integer> map1 = new HashSet<>(list).stream().collect(Collectors.toMap(s -> s, String::length));
		System.out.println("map1 = " + map1);

		Collections.swap(list, 1, 2);
		System.out.println("list = " + list);

		Function<String, Integer> length = String::length;
		Consumer<String> print = System.out::println;

		int[] array = IntStream.range(1, 10).skip(3).limit(5).toArray();
		System.out.println("Arrays.toString(array) = " + Arrays.toString(array));

		Map<Integer, List<String>> collect1 = list.stream().collect(Collectors.groupingBy(String::length));
	}

}
