package org.hana8.trythis;

public @interface In {
	String[] value() default {"Hong", "Kim", "Lee"};
}
