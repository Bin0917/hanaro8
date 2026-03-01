package org.hana8.trythis;

import java.math.BigDecimal;

public class OOP {
	public static void main(String[] args) {
		checkingAcc ac = new checkingAcc();
		fixedAcc fc = new fixedAcc();
		pensionAcc pc = new pensionAcc();
		Account[] accounts = {ac, fc, pc};

		for (Account acc : accounts) {
			acc.deposit(BigDecimal.valueOf(500000));
		}

		ac.withdraw();
		for (Account acc : accounts) {
			System.out.println("acc.accountMoney = " + acc.accountMoney);
		}
		System.out.println("-----------");

		fc.deposit(BigDecimal.valueOf(100000));
		fc.deposit(BigDecimal.valueOf(500000));
		for (Account acc : accounts) {
			System.out.println("acc.accountMoney = " + acc.accountMoney);
		}
		System.out.println("-----------");

		fc.mature(ac);
		for (Account acc : accounts) {
			System.out.println("acc.accountMoney = " + acc.accountMoney);
		}
	}
}
