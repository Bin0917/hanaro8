package org.hana8.IO;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class Nsl {
	// java Nsl https://naver.com
	public static void main(String[] args) throws UnknownHostException {
		if (args.length < 1) {
			System.out.println("usage");
			System.out.println("java Nsl https://naver.com");
			System.exit(0);
		}

		String domain = args[0].replace("https?://([^/?#]+).*", "$1");
		InetAddress[] allByName = InetAddress.getAllByName(domain);  // ... 미완 흠

	}
}
