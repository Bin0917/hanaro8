package org.hana8.oop;

public class Account {
	// 계좌명
	private final String name;
	// 잔액
	protected double amount;

	public Account(String name) {
		this.name = name;
	}

	public void deposit(double amount) {
		this.amount += amount;
	}

	protected void close() {
		System.out.println(this.name + " 통장을 해지했습니다.");
	}

	@Override
	public String toString() {
		return "Account{" +
			"name='" + name + '\'' +
			", amount=" + amount +
			'}';
	}
}
