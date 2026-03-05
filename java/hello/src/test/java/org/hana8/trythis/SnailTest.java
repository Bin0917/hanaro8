package org.hana8.trythis;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class SnailTest {

	@Test
	void makeSnail() {
		int[] arr4 = {1, 2, 9, 3, 10, 8, 4, 5, 6, 7};
		int[] arr5 = {1, 2, 3, 4, 5, 16, 17, 18, 19, 6, 15, 24, 25, 20, 7, 14, 23, 22, 21, 8, 13, 12, 11, 10, 9};
		assertArrayEquals(arr5, Snail.makeSnail(5));
		assertArrayEquals(arr5, Snail.makeTriangleSnail(4));
		// assertEquals(arr5, Snail.makeSnail(5));
	}
}
