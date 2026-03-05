package org.hana8.IO;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;

public class NIO {
	private final static Path path = Path.of("t.txt");

	public static void main(String[] args) throws IOException {
		// smallFile();
		// bigFileWrite();
		// bigFile();
		bigFileReadAndWrite();
	}

	private static void bigFileReadAndWrite() {
		// path는 항상 src 위쪽 폴더 (여기선 hello)
		// Path srcPath = Path.of("src");
		// Path 경로 먹기 잘 하기!!
		Path srcPath = Path.of("").resolve("src/main/java").resolve("org/hana8/IO").resolve("NIO.java");
		System.out.println("Files.exists(srcPath) = " + Files.exists(srcPath));

		try (BufferedReader bf = Files.newBufferedReader(srcPath); BufferedWriter bw = Files.newBufferedWriter(path)) {
			String ln;
			while ((ln = bf.readLine()) != null) {
				bw.write(ln);
				bw.newLine();
			}
		} catch (Exception e) {
			e.printStackTrace(System.out);
		}
	}

	private static void bigFile() {
		try (BufferedReader bf = Files.newBufferedReader(path)) {
			String ln;
			while ((ln = bf.readLine()) != null) {
				System.out.println("ln = " + ln);
			}
		} catch (Exception e) {
			e.printStackTrace(System.out);
		}
	}

	private static void bigFileWrite() throws IOException {
		try (BufferedWriter bw = Files.newBufferedWriter(path, StandardOpenOption.WRITE)) {
			for (int i = 0; i < 10; i++) {
				bw.write("write" + i + '\n');
			}
		} catch (Exception e) {
			e.printStackTrace(System.out);
		}
	}

	private static void smallFile() throws IOException {

		String s = Files.readString(path);
		System.out.println("s = " + s);

		List<String> ss = Files.readAllLines(path);
		for (String x : ss) {
			System.out.println("x = " + x);
		}
		System.out.println("ss.stream().filter(sx->sx.startsWith(\"Error:\")).toList() = " + ss.stream()
			.filter(sx -> sx.startsWith("Error:"))
			.toList());
	}

}
