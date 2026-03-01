package org.hana8.trythis;

import java.math.BigDecimal;

public class fixedAcc extends Account {
	public void mature(Account ac) {
		ac.deposit(accountMoney);
		accountMoney = BigDecimal.valueOf(0);
	}
}
