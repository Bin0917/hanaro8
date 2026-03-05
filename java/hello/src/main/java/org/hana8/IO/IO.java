package org.hana8.IO;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class IO {
	public static void main(String[] args) throws IOException {
		OutputStream os = new FileOutputStream("t.txt");
		os.write(65);
		os.write(66);
		// os.write(10); -> \n 개행문자임
		os.write(System.lineSeparator().getBytes());
		os.write("세종대왕".getBytes()); // -> 몇 바이트일지 모르기 때문에, getBytes() 로 가져와줘야함
		os.write(System.lineSeparator().getBytes());
		os.close();

		InputStream is = new FileInputStream("t.txt");
		byte[] buf = new byte[10];
		int read = 0;
		while ((read = is.read(buf)) != -1) {
			System.out.println("read = " + read + ":" + new String(buf, 0, read));
		}

	}
}
