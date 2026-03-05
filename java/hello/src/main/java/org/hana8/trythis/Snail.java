package org.hana8.trythis;

public class Snail {
	public static void main(String[] args) {
		makeSnail(5);
	}

	public static int[] makeSnail(int N) {
		int[][] snails = new int[N][N];

		int val = 0;
		// 오호라..
		int row = -1;
		int col = 0;
		int flag = 1;

		for (int w = N + N - 1; w > 0; w -= 2) {
			for (int i = 0; i < w; i++) {
				if (i <= w / 2)
					row += flag;
				else
					col += flag;
				snails[col][row] = ++val;
			}
			flag *= -1;
		}

		int[] results = new int[N * N];
		int idx = 0;
		for (int[] _arr : snails) {
			for (int n : _arr) {
				System.out.printf("%3d", n);
				results[idx++] = n;
			}
			System.out.println();
		}
		return results;
	}

	public static int[] makeTriangleSnail(int N) {
		int[] results = new int[N];

		int garo = 0;
		int sero = 0;
		int val = 0;
		for (int i = 0; i < N; i++) {
			for (int j = i; j < N; j++) {
				
			}
		}

		return results;
	}
}
