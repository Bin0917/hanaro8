package org.hana8.trythis;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class checkingAcc extends Account {
	public BigDecimal withdraw() {
		BigDecimal half = accountMoney.divide(BigDecimal.valueOf(2), RoundingMode.HALF_UP);
		accountMoney = half;
		return half;
	}

}
