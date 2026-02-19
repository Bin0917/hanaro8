package org.hana8.trythis;

public @interface MyAnnotation {
	String value() default "";

	int count() default 1;
}
