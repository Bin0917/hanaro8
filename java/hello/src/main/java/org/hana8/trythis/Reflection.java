package org.hana8.trythis;

import org.hana8.Annotations.In;
import org.hana8.Annotations.Max;
import org.hana8.Annotations.Min;
import org.hana8.Annotations.NotNull;
import org.hana8.Operation;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
@NoArgsConstructor
public class Reflection extends Parent {
	@Min(value = 3, msg = "3글자 이상 입력하세요!")
	@In({"Hong", "Kim", "Lee", "Choi"})
	private String name;

	@NotNull()
	@Min(value = 5, msg = "5보다는 커야합니다!")
	@Max(value = 10, msg = "10보다 작아야합니다!")
	private Integer deptId;

	@NotNull("필수값이에요우")
	@Min(3)
	@Max(15)
	private Double rate;

	private Boolean isOut;
	private Emp emp;
	private Operation operation;

	public Reflection(Integer deptId, String name) {
		this.deptId = deptId;
		this.name = name;
	}
}
