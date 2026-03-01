package org.hana8.trythis;

public class Snail {
	public static void main(String[] args) {
		// 1. 이차원배열
		// 2. 값이 업다면? 값 넣고 1 증가
		// 3. 앞으로 쭈욱 가다가~ 배열의 끝에 도달하면 기존놈 +-플래그 바꾸고 증가하는 놈 변경
		// 4. 반복

		int[][] matrix = new int[5][5];

		int x = 0;
		int y = 0;
		int num = 1;
		int isXcor = 1;
		int isYcor = 1;

		boolean isHorizental = true;

		while (num < 26) {
			// 배열의 끝을 넘은 경우
			if (x >= matrix.length || x < 0) {
				if (isXcor == 1) {
					x -= 1;
				} else {
					x += 1;
				}
				isHorizental = true;
				isXcor *= -1;
				continue;
			}
			if (y >= matrix.length || y < 0) {
				if (isYcor == 1) {
					y -= 1;
				} else {
					y += 1;
				}
				isHorizental = false;
				isYcor *= -1;
				continue;
			}
			// 값이 이미 있다면? 패스
			if (matrix[x][y] != 0) {
				if (isHorizental) {
					if (isYcor == 1) {
						y -= 1;
					} else {
						y += 1;
					}
					isHorizental = false;
					isYcor *= -1;
				} else {
					if (isXcor == 1) {
						x -= 1;
					} else {
						x += 1;
					}
					isHorizental = true;
					isXcor *= -1;
				}
				continue;
			}
			System.out.println("num = " + num);
			matrix[x][y] = num++;
			if (isHorizental) {
				y += y * isYcor;
			} else {
				x += x * isXcor;
			}
		}

		for (int[] _arr : matrix) {
			for (int j : _arr) {
				System.out.printf("%2d", j);
			}
			System.out.println();
		}
	}
}
