// package org.hana8.trythis;
//
// public class StringHandle {
// 	public static void main(String[] args) {
// 		// 다음과 같은 로그가 있다. 다음을 수행하시오.
// 		String logs = "\t\t2024-02-05 09:15:23 ERROR UserService: Login failed for user admin\n"
// 			+ "\t\t2024-02-05 09:16:45 INFO PaymentService: Payment processed for order #1234\n"
// 			+ "\t\t2024-02-05 09:17:12 ERROR DatabaseService: Connection timeout\n"
// 			+ "\t\t2024-02-05 09:18:33 WARN UserService: Password retry limit reached for user john\n"
// 			+ "\t\t2024-02-05 09:19:01 ERROR UserService: Login failed for user admin\n"
// 			+ "\t\t2024-02-05 09:20:15 INFO OrderService: New order created #1235";
//
// 		String[] logsArr = logs.split("\n");
// 		// 1. 전체 로그 개수
// 		int logNum = logsArr.length;
// 		// 2. 각 로그 레벨(ERROR, INFO, WARN)별 개수
// 		// int Error_cnt = 0;
// 		// int Info_cnt = 0;
// 		// int Warn_cnt = 0;
// 		//
// 		// for (int i = 0; i < logNum; i++) {
// 		// 	if (logsArr[i].contains("ERROR")) {
// 		// 		Error_cnt++;
// 		// 	}
// 		// 	if (logsArr[i].contains("INFO")) {
// 		// 		Info_cnt++;
// 		// 	}
// 		// 	if (logsArr[i].contains("WARN")) {
// 		// 		Warn_cnt++;
// 		// 	}
// 		// }
//
// 		// 다른 방법!! (강사님 ver)
// 		final String[] services = {"UserService", "PaymentService", "DatabaseService", "OrderService"};
// 		int[] serviceCnts = {0, 0, 0, 0};
//
// 		// System.out.printf("ERROR: %d, INFO, %d, WARN: %d%n", Error_cnt, Info_cnt, Warn_cnt);
// 		System.out.printf("ERROR: %d, INFO, %d, WARN: %d%n", Error_cnt, Info_cnt, Warn_cnt);
// 		// 3. 최다 등장한 서비스 이름과 횟수
//
// 		for (int i = 0; i < logNum; i++) {
// 			String[] log = logsArr[i].split(" ");
// 			String service = log[0];
//
// 		}
// 		// 4. "admin" 사용자와 관련된 로그만 추출하여 출력
//
// 		for (int i = 0; i < logNum; i++) {
// 			if (logsArr[i].contains("admin")) {
// 				System.out.println(logsArr[i]);
// 			}
// 		}
// 		// 5. ERROR 로그만 모아서 메시지 부분만 출력
// 		for (int i = 0; i < logNum; i++) {
//
// 			int idx = logsArr[i].indexOf("ERROR");
// 			if (idx != -1) {
// 				System.out.println(logsArr[i].substring(idx + 1));
// 			}
// 		}
// 		// 1. 전체 로그: 6개
// 		// 2. ERROR: 3개, INFO: 2개, WARN: 1개
// 		// 3. 최다 등장한 서비스: UserService (3회)
// 		// 4. admin 관련 로그
// 		// 2024-02-05 09:15:23 ERROR UserService: Login failed for user admin
// 		// 2024-02-05 09:19:01 ERROR UserService:Login failed for user admin
// 		// 5. ERROR 로그 모음
// 		// UserService: Login failed for user admin
// 		// DatabaseService: Connection timeout
// 		// UserService: Loginfailed for user admin
//
// 	}
// }
package org.hana8.trythis;

// 강사님 ver
public class StringHandle {
	public static void main(String[] args) {
		String log = """
			2024-02-05 09:15:23 ERROR UserService: Login failed for user admin
			2024-02-05 09:16:45 INFO PaymentService: Payment processed for order #1234
			2024-02-05 09:17:12 ERROR DatabaseService: Connection timeout
			2024-02-05 09:18:33 WARN UserService: Password retry limit reached for user john
			2024-02-05 09:19:01 ERROR UserService: Login failed for user admin
			2024-02-05 09:20:15 INFO OrderService: New order created #1235""";

		int errorCnt = 0;
		int infoCnt = 0;
		int warnCnt = 0;
		final String[] services = {"UserService", "PaymentService", "DatabaseService", "OrderService"};
		int[] serviceCnts = {0, 0, 0, 0};

		StringBuilder sbAdmin = new StringBuilder();
		StringBuilder sbError = new StringBuilder();
		String[] logs = log.split("\n");
		for (String l : logs) {
			// String[] arr = l.split("Service:");
			String[] dt_tm_lvl_svc_msg = l.split(" ", 5);
			// System.out.println("arr = " + Arrays.toString(dt_tm_lvl_svc_msg));

			String lvl = dt_tm_lvl_svc_msg[2];
			String svc = dt_tm_lvl_svc_msg[3].replace(":", "");
			String msg = dt_tm_lvl_svc_msg[4];
			switch (lvl) {
				case "ERROR" -> errorCnt++;
				case "INFO" -> infoCnt++;
				case "WARN" -> warnCnt++;
			}

			// IntStream.range(0, services.length).filter(i -> services[i].equals(svc)).findFirst().orElse(-1)
			// Arrays.asList(services).indexOf(svc)
			for (int i = 0; i < services.length; i++) {
				if (services[i].equals(svc))
					serviceCnts[i]++;
			}

			if (msg.contains("admin")) {
				if (!sbAdmin.isEmpty())
					sbAdmin.append('\n');
				sbAdmin.append(l);
			}

			if (lvl.equals("ERROR")) {
				if (!sbError.isEmpty())
					sbError.append('\n');
				sbError.append(svc).append(':').append(' ').append(msg);
			}
		} // end of for...

		System.out.printf("1. 전체 로그: %d개%n", logs.length);
		System.out.printf("2. ERROR: %d개, INFO: %d개, WARN: %d개%n", errorCnt, infoCnt, warnCnt);

		int bigServiceCnt = 0;
		String bigService = "";
		for (int i = 0; i < serviceCnts.length; i++) {
			if (bigServiceCnt < serviceCnts[i]) {
				bigServiceCnt = serviceCnts[i];
				bigService = services[i];
			}
		}
		System.out.printf("3. 최다 등장한 서비스: %s (%d회)%n", bigService, bigServiceCnt);
		// System.out.println("serviceCnts = " + Arrays.toString(serviceCnts));

		System.out.println("4. admin 관련 로그\n" + sbAdmin);
		System.out.println("5. Error 로그\n" + sbError);
	}
}
