package org.hana8.threads;

public class VirtualThread {
	public static void main(String[] args) {
		for (int i = 0; i < 100000; i++) {
			final int ii = i;
			// Thread.ofPlatform().start(() -> {
			Thread.ofVirtual().start(() -> {
				System.out.println("Thread" + ii);
				try {
					Thread.sleep(1000);
				} catch (Exception e) {
					throw new RuntimeException(e);
				}
			});
		}
	}
}
