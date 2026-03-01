package org.hana8.trythis;

import java.math.BigDecimal;

public abstract class Account {

	protected BigDecimal accountMoney = BigDecimal.valueOf(0);

	public void deposit(BigDecimal depositMoney) {
		accountMoney = accountMoney.add(depositMoney);
	}
}
