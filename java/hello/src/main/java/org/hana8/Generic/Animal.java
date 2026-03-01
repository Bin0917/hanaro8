package org.hana8.Generic;

import java.util.ArrayList;
import java.util.List;

public class Animal {
	protected String name;

	public Animal(String name) {
		this.name = name;
	}

	public static <T extends Animal> void sound(T catOrDog) {
		System.out.println(catOrDog);
	}

	public static void main(String[] args) {
		Dog maxx = new Dog("Maxx");
		Cat navi = new Cat("navi");
		Animal.sound(maxx);
		Animal.sound(navi);
		Animal.sound(new Cat("yebbi"));

		CatOrDog<Dog, Cat> cd = new CatOrDog<>(maxx, navi);
		cd.sound();

		// 평범한 느낌
		List<Dog> dogList = new ArrayList<>();
		dogList.add(maxx);
		List<Cat> catList = new ArrayList<>();
		catList.add(navi);
		System.out.println(dogList.size() + "," + catList.size());

		// extends => 읽기전용 ㅇㅇ
		List<String> list = new ArrayList<>();
		List<? extends Animal> extList1 = new ArrayList<>();
		List<? extends Animal> extList2 = dogList; // 멍밍이 전용으로 변경
		List<? extends Animal> extList3 = catList; // 고양이 전용으로 변경
		printAnimal(dogList);
		printAnimal(catList);
		// extList2.add(maxx);
		// extList1.add(navi);

		System.out.println("extList1.size() = " + extList2.size());
		System.out.println("extList1.size() = " + extList3.size());

		// super로 작성해주어야 Animal 이하 친구들 add등 수정가능
		List<? super Animal> superList1 = new ArrayList<>();
		superList1.add(maxx);
		superList1.add(navi);
		superList1.add(new Animal("ABC"));
	}

	static void printAnimal(List<? extends Animal> lst) {
		System.out.println("lst.size() = " + lst.size());
	}

	@Override
	public String toString() {
		return "Animal{" +
			"name='" + name + '\'' +
			'}';
	}
}
