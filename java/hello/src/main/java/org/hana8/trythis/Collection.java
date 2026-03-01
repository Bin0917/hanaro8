package org.hana8.trythis;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

public class Collection {
	public static void main(String[] args) {
		String logs = "1001,Hong,Choi,5000\n"
			+ "1002,Lee,Park,20000\n"
			+ "1003,Hong,Jade,10000\n"
			+ "1004,Kim,Park,20000\n"
			+ "1005,Lee,Choi,5000\n"
			+ "1006,Hong,Choi,5000\n";

		String[] logss = logs.split("\n");
		// LinkedHashSet => 입력된 순서대로 저장이 됨. 이 문제에선 얘가 베스트
		Map<String, Queue<String>> map = new HashMap<>();
		// 받는 사람 기준으로 보낸사람 목록 출력 (중복x, 이체된 순)
		for (String s : logss) {
			String[] arr = s.split(",");
			// 없으면 넣어주기
			if (!map.containsKey(arr[1]))
				map.put(arr[1], new LinkedList<>());
			// 이미 체크한 인원 패스
			if (map.get(arr[1]).contains(arr[2]))
				continue;

			map.get(arr[1]).add(arr[2]);
		}
		System.out.println("목록 = " + map);

		String mostSend = "";
		String maxSend = "";
		int mostSendCnt = 0;
		int maxSendCnt = 0;

		// 가장 자주 보낸 사람과 가장 많은 금액을 보낸 사람
		// 강사님은 금액용, 횟수용 맵 각각 따로 만드심
		Map<String, int[]> map2 = new HashMap<>();
		for (String s : logss) {
			String[] arr = s.split(",");
			if (!map2.containsKey(arr[2])) {
				map2.put(arr[2], new int[2]);
			}

			int[] isCntOrMoney = map2.get(arr[2]);
			isCntOrMoney[0] += 1;
			isCntOrMoney[1] += Integer.parseInt(arr[3]);

			if (isCntOrMoney[0] > mostSendCnt) {
				mostSendCnt = isCntOrMoney[0];
				mostSend = arr[2];
			}
			if (isCntOrMoney[1] > maxSendCnt) {
				maxSendCnt = isCntOrMoney[1];
				maxSend = arr[2];
			}
		}
		System.out.printf("가장 자주 보낸 사람: %s (%d회)%n", mostSend, mostSendCnt);
		System.out.printf("가장 많이 보낸 사람: %s (%d원)%n", maxSend, maxSendCnt);

		// 가장 많은 금액을 받은 사람
		String maxTake = "";
		int maxTakeCnt = 0;
		Map<String, Integer> map3 = new HashMap<>();
		for (String s : logss) {
			String[] arr = s.split(",");
			if (!map3.containsKey(arr[1])) {
				map3.put(arr[1], 0);
				// System.out.println("arr[1] = " + arr[1]);
			}

			// merge => value에 계산해주는 함수
			int val = map3.merge(arr[1], Integer.parseInt(arr[3]), Integer::sum);
			if (val > maxTakeCnt) {
				maxTakeCnt = val;
				maxTake = arr[1];
			}
		}
		// System.out.println("map3 = " + map3);
		System.out.printf("가장 많이 받은 사람: %s (%d원)", maxTake, maxTakeCnt);

	}
}
