package org.hana8.threads;

import java.awt.*;
import java.io.File;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Scanner;

import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;

public class Alarm {
	private static final DateTimeFormatter Tf = DateTimeFormatter.ofPattern("HH:mm:ss");

	public static void main(String[] args) {

		try (Scanner sc = new Scanner(System.in)) {
			LocalTime lt = null;
			while (lt == null) {
				LocalTime now = LocalTime.now();
				System.out.printf("현재 시간은 %s, 알람시간은?", now.format(Tf));
				// parse = ( String류 {, 데이터 포맷 형식}); 으로 사용 가능
				try {
					lt = LocalTime.parse(sc.nextLine(), Tf);
				} catch (DateTimeParseException e) {
					System.out.println("Invalid TimeFormat!! =>");
					System.out.println("usage: HH:mm:ss");
				}
			}

			// th 내부는 독립적이기 때문에, final을 붙인 변수에 옮겨담아 써야한다.
			final LocalTime alarmTime = lt;
			// Thread.ofPlatform().start ...
			Thread th = new Thread(() -> {
				System.out.println("Alarm Time: " + alarmTime);
				LocalTime now = LocalTime.now();
				while (now.isBefore(alarmTime)) {
					System.out.printf("\r%s", now.format(Tf));
					try {
						Thread.sleep(1000);
						now = LocalTime.now();
					} catch (InterruptedException e) {
						throw new RuntimeException(e);
					}
				}
				System.out.println("  Alarm!!");
				// 띵~ 하는 효과음
				Toolkit.getDefaultToolkit().beep();
				try (AudioInputStream ais = AudioSystem.getAudioInputStream(
					new File("/c/Users/campus2H060/Downloads/example.wav"))) {
					Clip clip = AudioSystem.getClip();
					clip.open(ais);
					clip.start();
					Thread.sleep(1000);
				} catch (Exception e) {
					throw new RuntimeException(e);
				}
			});
			th.start();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}
}
