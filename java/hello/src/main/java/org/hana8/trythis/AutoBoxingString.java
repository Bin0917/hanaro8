package org.hana8.trythis;

public class AutoBoxingString {
	public static void main(String[] args) {
		// 인스턴스 -> 프리미티브 자동 = 언박싱
		// 프리미티브값 -> 인스턴스에 자동 맵핑? =?> 박싱
		// Integer iObj = new Integer(100);
		Integer iObj = 100;// auto-box 덕에 걍 프리미티브 값을 그대로 줄 수 있음
		System.out.println("iObj.byteValue() = " + iObj.byteValue()); // byteValue같은거 쓸라믄 Integer로 해야함
		int i1 = iObj; //auto-unbox

		String s = "honb@gmail.com";

		int idxAt = s.indexOf("@");
		System.out.println("idxAt = " + idxAt);
		String name = s.substring(0, idxAt);
		
	}
}
