package org.hana8.trythis;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

// @Data -> final 붙은애들의 setter를(?) 또 따로 맹글어버림
// 롬복 - 게터,세터 작성할 필요 없이 컴파일과정에서 롬복이 알아서 맹글어준다!
@Getter
@Setter
// @RequiredArgsConstructor 이친구를 상속받는 애들은 arg 받는거 만들어줘야한다 (?)
@AllArgsConstructor // 생성자 롬복
// @ToString(exclude = "dept", callSuper = true)//부모의 toString을 오버라이드하거나 그대로 쓰겠다!
// compareTo? 할때 equals나 hashcode 만듬
@EqualsAndHashCode()
class Emp {
	String name;
	String dept;
	int score;

	// @Singular 복수형을 하나씩 주고싶을때 사용! / 없으면 List.of("22@22"), 잇으면 걍 문자열로 박기 가능

	// Emp(String name, String dept, int score) {
	// 	this.name = name;
	// 	this.dept = dept;
	// 	this.score = score;
	// }

	@Override
	public String toString() {

		return "%s (%d)".formatted(name, score);
		// return "Emp{" +
		// 	"name='" + name + '\'' +
		// 	", score=" + score +
		// 	'}';
	}

	public void print() {
		// System.out.printf("%s: %s",dept, toString());
		System.out.printf("%s: %s(%d)", dept, name, score);
	}

	public void println() {
		// System.out.printf("%s: %s",dept, toString());
		System.out.printf("%s: %s(%d)%n", dept, name, score);
	}

	public static EmpBuilder builder() {
		return new EmpBuilder();
	}

	// 꼬옥 다시 해보기!!!!!!! 뭔가 꽤나 생각보다 복잡시러움
	public static void main(String[] args) {

		List<Emp> emps = Arrays.asList(
			new Emp("Hong", "Sales", 85),
			new Emp("Kim", "Sales", 95),
			new Emp("Choi", "HR", 55),
			new Emp("Nam", "HR", 75),
			new Emp("Lee", "IT", 82),
			new Emp("Park", "IT", 92),
			new Emp("Ahn", "Sales", 95)
		);

		emps.forEach(System.out::println);

		//고과점수 70점 이상 제외
		List<Emp> candidate = emps.stream().filter(emp -> emp.getScore() >= 70).toList();
		System.out.println("고과점수 70점 이상 제외");
		candidate.forEach(Emp::println);

		//부서별로 출력 (부서이름 순) -> 그루핑 => collect 사용 / (grouping by - 그냥 map으로 반환) 따라서, 순서가 보장되는 Linked로 바꿔서 생성해야함
		var empsByDept = candidate.stream().sorted(Comparator.comparing(Emp::getDept, String::compareTo))
			.collect(Collectors.groupingBy(Emp::getDept, LinkedHashMap::new, Collectors.toList()));
		System.out.println("부서별로 출력 (부서이름 순)");
		System.out.println("empsByDept = " + empsByDept);

		//부서별 최고점수 1명만
		// 점수가 같다면 이름이 빠른사람 한명만
		LinkedHashMap<String, Optional<Emp>> maxScoreByDept = candidate.stream()
			.sorted(Comparator.comparing(Emp::getName))
			.sorted(Comparator.comparing(Emp::getDept))
			.collect
				(Collectors.groupingBy(Emp::getDept, LinkedHashMap::new,
					Collectors.maxBy(Comparator.comparingInt(Emp::getScore))));

		candidate.stream()
			.sorted(Comparator.comparing(Emp::getName))
			.sorted(Comparator.comparing(Emp::getDept))
			.collect(Collectors.groupingBy(Emp::getDept, LinkedHashMap::new,
				Collectors.maxBy(Comparator.comparing(Emp::getScore))));
		System.out.println("부서별 최고점수 1명");
		System.out.println("maxScoreByDept = " + maxScoreByDept);

		// 부서이름 역순으로 줄력 -- 부서명: 이름(점수)

		LinkedHashMap<String, Optional<Emp>> maxScoreByDeptOrder = candidate.stream()
			.sorted(Comparator.comparing(Emp::getDept).reversed())
			.sorted(Comparator.comparing(Emp::getName))
			.collect(Collectors.groupingBy(Emp::getDept, LinkedHashMap::new,
				Collectors.maxBy(Comparator.comparingInt(Emp::getScore))));

		System.out.println("부서이름 역순으로 줄력");
		System.out.println("collect = " + maxScoreByDeptOrder);
		System.out.println("-------------");

		Set<Map.Entry<String, Optional<Emp>>> entries = maxScoreByDeptOrder.entrySet();
		for (Map.Entry<String, Optional<Emp>> entry : entries) {
			String dept = entry.getKey();
			Emp tEmp = entry.getValue().orElse(null);
			if (tEmp == null)
				System.out.printf("%s: 최고 득점자 없음%n", dept);
			else
				tEmp.println();
		}

		Emp x = Emp.builder().name("Hong").dept("Sales").score(90).build();
		// 이하 Reflection 공부 (?) -> reflection 은 setter 안거치고 값을 줘서 보안 문제가 날 수 있음?
		// getField - 내가 접근할 수 있는 애들만
		// getDeclared~ - private까지 다 내놔
		Field[] fields = x.getClass().getDeclaredFields();
		Arrays.asList(fields).forEach(System.out::println);

	}

	public static class EmpBuilder {
		private String name;
		private String dept;
		private int score;
		private ArrayList<String> emails;

		EmpBuilder() {
		}

		public EmpBuilder name(String name) {
			this.name = name;
			return this;
		}

		public EmpBuilder dept(String dept) {
			this.dept = dept;
			return this;
		}

		public EmpBuilder score(int score) {
			this.score = score;
			return this;
		}

		public EmpBuilder mail(String mail) {
			if (this.emails == null)
				this.emails = new ArrayList<String>();
			this.emails.add(mail);
			return this;
		}

		public EmpBuilder emails(Collection<? extends String> emails) {
			if (emails == null) {
				throw new NullPointerException("emails cannot be null");
			}
			if (this.emails == null)
				this.emails = new ArrayList<String>();
			this.emails.addAll(emails);
			return this;
		}

		public EmpBuilder clearEmails() {
			if (this.emails != null)
				this.emails.clear();
			return this;
		}

		public Emp build() {
			return new Emp(this.name, this.dept, this.score);
		}

		public String toString() {
			return "Emp.EmpBuilder(name=" + this.name + ", dept=" + this.dept + ", score=" + this.score + ", emails="
				+ this.emails + ")";
		}
	}

	// public static class EmpBuilder {
	// 	String name;
	// 	public EmpBuilder name(String name) {
	// 		this.name = name;
	// 		return this;
	// 	}
	// 	public dept() {}
	// 	public score() {}
	// }
}
