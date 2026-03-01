package org.hana8.threads;

import java.util.concurrent.ThreadLocalRandom;

public class MyThread extends Thread {
	@Override
	public void run() {
		try {
			Thread.sleep(1000);
			System.out.printf("Thread %s started%n", this.getName());
		} catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
	}

	// 메인함수 == 메인스레드 (부모프로세스)
	public static void main(String[] args) throws InterruptedException {
		for (int i = 0; i < 5; i++) {
			// new 로 만들면 스레드를 '따로' 만듦. 그래서 theend 먼저 출력됨. / 시간 걸어주면 굳
			// 다른 cpu라고 생각하는게 편함
			// Thread t = new MyThread();
			// t.start();

			Thread t2 = new Thread(() -> {
				int cnt = 0;
				while (cnt < 20) {
					cnt += ThreadLocalRandom.current().nextInt(1, 5);
					System.out.printf("cnt = %d ", cnt);
					try {
						Thread.sleep((long)(1000 * Math.random()));
					} catch (InterruptedException e) {
						throw new RuntimeException(e);
					}
				}
				System.out.println("End of cnt: " + cnt);
			}, "Thread" + i);
			t2.start();
			// join이 약간 await 같은 느낌. join() 만나면, 여기줄에서 t2가 끝날때까지 기다림
			t2.join();
		}
		System.out.println("The End!");
	}
}
