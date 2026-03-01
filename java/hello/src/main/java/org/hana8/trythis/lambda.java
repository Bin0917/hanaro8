package org.hana8.trythis;

import java.util.List;

@FunctionalInterface
interface MyPredicate<T> {
	boolean test(T t);
}

@FunctionalInterface
interface MyFunction<T, R> {
	R apply(T t);
}

@FunctionalInterface
interface MyReducer<T, R> {
	R reduce(R acc, T t);
}

public class lambda {
	static List<Integer> filter(List<Integer> list, MyPredicate<Integer> predicate) {
		// List<Integer> returnList = new ArrayList<>();
		// for (int a : list) {
		// 	if (predicate.test(a))
		// 		returnList.add(a);
		// }
		// return returnList;
		return list.stream().filter(predicate::test).toList(); //스트림 활용하면 일케됨!! 매우.. 짧아짐..
	}

	// myfunction integer 두개 -> 하나는 입력값, 하나는 리턴값임!!
	static List<Integer> map(List<Integer> list, MyFunction<Integer, Integer> function) {
		// List<Integer> returnlst = new ArrayList<>();
		// for (int a : list)
		// 	returnlst.add(function.apply(a));
		// return returnlst;
		return list.stream().map(function::apply).toList();
	}

	static Integer find(List<Integer> list, MyPredicate<Integer> predicate) {
		for (int a : list) {
			if (predicate.test(a))
				return a;
		}
		// 못찾았을경우 -1 반환
		return -1;
	}

	static Integer reducer(List<Integer> list, int initValue, MyReducer<Integer, Integer> reducer) {
		// 그냥바로 initValue로 시작해도 될 듯
		int acc = initValue;

		for (int i : list) {
			acc = reducer.reduce(acc, i);
		}
		return acc;
	}
}
