package org.hana8.trythis;

import java.math.BigDecimal;
import java.util.Scanner;

import org.hana8.Operation;

public class Operator {
	//overload
	public static BigDecimal getNumber(Scanner sc) {
		return getNumber(sc, 2, null);
	}

	public static BigDecimal getNumber(Scanner sc, int num, BigDecimal defVal) {
		while (true) {
			System.out.printf("값%d? ", num);
			try {
				String s = sc.nextLine();
				if (s.isBlank())
					return defVal;
				if (s.equals("."))
					throw new IllegalStateException("END");
				return new BigDecimal(s);

			} catch (NumberFormatException e) {
				System.out.println("숫자만 입력 가능합니다");
			}
		}
	}

	public static Operation getOperation(Scanner sc) {
		while (true) {
			System.out.println("연산자? (+, -, *, /) ");
			char cmd = sc.nextLine().charAt(0);
			if (cmd == '.')
				// main함수의 catch에 걸림.
				throw new IllegalStateException("END");

			// 변수 선언 및 초깃값 설정
			Operation foundOper = null;
			for (Operation oper : Operation.values()) {
				if (oper.isMe(cmd)) {
					foundOper = oper;
					break;
				}
			}

			if (foundOper == null) {
				System.out.println("그런 연산자는 없음니다");
			} else
				return foundOper;
		}
	}

	public static void main(String[] args) {
		// 연산자 네개 - enum
		// 입력값 - bigdecimal

		Scanner sc = new Scanner(System.in);
		System.out.println("계산기를 시작합니다 (종료는 .)");
		BigDecimal v1 = BigDecimal.valueOf(0);
		boolean isStartwithOperation = false;
		while (true) {
			try {
				if (isStartwithOperation) {
					isStartwithOperation = false;
				} else {
					v1 = getNumber(sc, 1, v1);
				}
				Operation oper = getOperation(sc);
				BigDecimal v2 = getNumber(sc);
				v1 = oper.apply(v1, v2);
			} catch (ArithmeticException e) {
				System.out.println("잘못된 연산: " + e.getMessage());
				isStartwithOperation = true;
			} catch (IllegalStateException e) {
				if (e.getMessage().equals("END"))
					System.out.println("계산기를 종료합니다!");
				else
					System.out.println(e.getMessage());
				break;
			} catch (Exception e) {
				e.printStackTrace(System.out);
			}
		}
		sc.close();

	}
}
