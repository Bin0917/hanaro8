package org.hana8;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Queue;
import java.util.Set;
import java.util.TreeSet;

public class CollectionPlay {
	public static void main(String[] args) {
		// var arrayList = new ArrayList<>(); //이렇게 쓰는것도 가능!!
		List<Integer> arrayList = new ArrayList<>();
		arrayList.add(3);
		System.out.println("arrayList = " + arrayList);

		Queue<Integer> ll = new LinkedList<>();
		ll.offer(4);
		ll.offer(5);
		ll.offer(1);
		System.out.println("ll = " + ll); // 순서 보장ㅇㅇ

		// 넣을땐 힙조정하고 넣고 뺄 때, 정렬해서 나옴 ㅇㅇ
		PriorityQueue<Integer> pq = new PriorityQueue<>();
		pq.offer(4);
		pq.offer(5);
		pq.offer(1);
		System.out.println("pq = " + pq);
		pq.offer(2);
		System.out.println("pq = " + pq);
		pq.offer(3);
		System.out.println("pq = " + pq);
		System.out.println(pq.poll());
		System.out.println(pq.poll());
		System.out.println(pq.poll());
		System.out.println(pq.poll());
		System.out.println(pq.poll());

		// 넣을때마다 계속 메모리 바꿈서 정렬 -> 메모리 소모 많다.
		Set<Integer> ts = new TreeSet<>();
		ts.add(4);
		ts.add(5);
		ts.add(1);
		System.out.println("ts = " + ts);
		ts.add(2);
		System.out.println("ts = " + ts);
		ts.add(3);
		System.out.println("ts = " + ts);

		// 들어갈때도 힙조정 x. 선형구조임
		Deque<Integer> dq = new ArrayDeque<>();
		// Deque<Integer> dq = new LinkedList<>();
		dq.offer(4);
		dq.offer(5);
		dq.offer(1);
		System.out.println("dq = " + dq);
		dq.offer(2);
		System.out.println("dq = " + dq);
		dq.offer(3);
		System.out.println("dq = " + dq);
		System.out.println(dq.poll());
		System.out.println(dq.poll());
		System.out.println(dq.poll());
		System.out.println(dq.poll());
		System.out.println(dq.poll());
		dq.push(6); // === offerFisrt (offer와 달리 앞쪽에 들어감)
		System.out.println("dq = " + dq);
		dq.pop(); // === poll() 과 동일함. 맨 앞 값 가져옴

		// key 는 중복허용 x.
		Map<Integer, String> map = new HashMap<>();
		map.put(4, "kim");
		map.put(11, "choi");
		map.put(5, "hong");
		map.put(6, "lee");
		System.out.println("map = " + map); // 순서 꼭 보장 x
		Set<Integer> keys = map.keySet();// key들만 set으로 빼줌
		System.out.println("keys = " + keys);
		for (int i : keys) { // => i는 오토언박싱 돼서 에러 안남 ㅇㅇ (Integer -> int)
			System.out.println("i = " + i);
		}
	}
}
