package org.hana8;

import java.io.Serializable;
import java.util.Scanner;
import java.util.concurrent.ThreadLocalRandom;

//TIP 코드를 <b>실행</b>하려면 <shortcut actionId="Run"/>을(를) 누르거나
// 에디터 여백에 있는 <icon src="AllIcons.Actions.Execute"/> 아이콘을 클릭하세요.
public class Main implements Serializable {

	public static void m(int i) {
		int a = i % 10;
		System.out.printf("iaa = %d %c, a = %d \n", a, a, i);
		// System.out.println(a);
	}

	public static void main(String[] args) {
		//TIP 캐럿을 강조 표시된 텍스트에 놓고 <shortcut actionId="ShowIntentionActions"/>을(를) 누르면
		// IntelliJ IDEA이(가) 수정을 제안하는 것을 확인할 수 있습니다.

		float f = 0.99999998f;
		double d = 0.99999998;
		System.out.println("f, d = " + f + ", " + d);

		String tb1 = """ 
				우앙
				신기해
			""";
		System.out.printf("tb1 = %s", tb1);
		System.out.println();

		int[][] arr = {
			{1, 2, 3},
			{4, 5},
			{6, 7, 8}
		};
		for (int i = 0; i < arr.length; i++) {
			for (int j = 0; j < arr[i].length; j++) {
				System.out.println(arr[i][j]);
			}
		}

		int month = ThreadLocalRandom.current().nextInt(1, 13);
		String season = switch (month) {
			case 12, 1, 2 -> "겨울";
			case 3, 4, 5 -> "봄";
			case 6, 7, 8 -> "여름";
			case 9, 10, 11 -> "가을";
			default -> "모름";
		};
		System.out.println("season = " + season);

		Scanner sc = new Scanner(System.in);
		System.out.println("Input num dbl? >> ");
		int num = sc.nextInt();
		double dbl = sc.nextDouble();
		String name = sc.nextLine();
		System.out.printf("num dbl name= %d %.1f %s%n", num, dbl, name);

	}
}
