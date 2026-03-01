package org.hana8;

import java.util.Arrays;

public class PlayArray {
	public static void main(String[] args) {
		// int[] iarr = new int[3];
		// int[] iarr = new int[] {1,2,3};
		int[] iarr = {1, 2, 3};

		// int di = 0;
		// while (true) {
		// 	try {
		// 		int[] arr = new int[Integer.MAX_VALUE - ++di];
		// 		System.out.println("Succeed: " + arr.length);
		// 		break;
		// 	} catch (OutOfMemoryError e) { ///  에러에는 exception 부문이랑, error 부문이 나뉨
		// 		System.out.println(e.getMessage() + ',' + di);
		// 	}
		//
		// }

		int[][] arr = new int[3][4];
		for (int i = 0; i < arr.length; i++) {
			for (int j = 0; j < arr[i].length; j++) {
				arr[i][j] = i * 4 + j + 1;
			}
		}
		System.out.println("Arrays.deepToString(arr) = " + Arrays.deepToString(arr));

		for (int[] _arr : arr) {
			for (int j : _arr) {
				System.out.printf("%3d", j);
			}
			System.out.println();
		}
	}
}
