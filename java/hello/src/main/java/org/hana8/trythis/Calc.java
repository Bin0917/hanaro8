package org.hana8.trythis;

public class Calc {
	private final int a;
	private final int b;

	public Calc(int a, int b) {
		this.a = a;
		this.b = b;
	}

	public static void main(String[] args) {
		//static은 독립적으로 되기때문에 생성을 하고 써야함
		Calc c = new Calc(1, 2);
		System.out.println("c.add() = " + c.add());
		Calc c2 = new Calc(3, 4);
		System.out.println("c2.sub() = " + c2.sub());
	}

	public int add() {
		return this.a + this.b;
	}

	public int sub() {
		return Math.abs(this.a - this.b);
	}

}
