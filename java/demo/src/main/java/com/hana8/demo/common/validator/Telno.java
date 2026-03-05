package com.hana8.demo.common.validator;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

// 기본 어노테이션 설정
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented //이걸 써야 자바복에 들어감
@Constraint(validatedBy = TelnoValidator.class) //validator 연결?
public @interface Telno { //message, groups, Payload 는 형식임. validator의 형식
	String message() default "유효하지 않은 전화번호 형식입니다.";

	// 이하 Jakarta Bean Validation 필수 필드들
	// 시점 (Request Method가 POST: OnCreate.class, PUT: OnUpdate.class)
	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
