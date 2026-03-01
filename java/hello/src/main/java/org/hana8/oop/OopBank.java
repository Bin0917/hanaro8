package org.hana8.oop;

public class OopBank {
	public static void main(String[] args) {
		Account[] accounts = {
			new FreeAccount(),
			new MonthlyAccount(),
			new FundAccount()
		};

		FreeAccount free = (FreeAccount)accounts[0];

		free.deposit(10000);
		free.transfer(accounts[1], 2000);
		free.transfer(accounts[2], 3000);

		for (Account acc : accounts) {
			if (acc instanceof Withdrawable with) {
				with.withdraw(acc.amount / 2);
			}
			System.out.println(acc);
		}
		accounts[1].deposit(1000);
		accounts[1].deposit(1000);
		accounts[1].deposit(1000);
		((MonthlyAccount)accounts[1]).mature(free);
	}
}
