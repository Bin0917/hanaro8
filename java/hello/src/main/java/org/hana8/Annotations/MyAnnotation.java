package org.hana8.Annotations;

public @interface MyAnnotation {
	String value() default "";

	int count() default 1;
}
