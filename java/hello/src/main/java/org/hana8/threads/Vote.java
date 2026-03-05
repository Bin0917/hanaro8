package org.hana8.threads;

import java.util.concurrent.ThreadLocalRandom;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Vote {
	private static final String[] areas = {"서울", "강원도", "부산", "충청북도", "제주도"};
	private String name;

	public static void main(String[] args) {
		Runnable myRun = () -> {
			String name = Thread.currentThread().getName();
			int percent = 0;
			while (percent < 100) {
				percent += ThreadLocalRandom.current().nextInt(1, 10);

				System.out.printf("\r%5s 개표율: %s (%d %%)", name,
					"*".repeat(percent), percent);
				try {
					Thread.sleep((long)(1000 * Math.random()));
				} catch (InterruptedException e) {
					throw new RuntimeException(e);
				}
			}
			System.out.println(Thread.currentThread().getName() + "개표 완료");
		};

		for (String area : areas) {
			Thread t = new Thread(myRun, area);
			t.start();
			// Thread.ofPlatform().start(myRun);
			// Thread t = Thread.ofVirtual().start(myRun);// 데몬이라 얘는 안보임. 돌모간 있음
			// t.join();
		}

	}
}
