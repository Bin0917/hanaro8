package org.hana8.Annotations;

import java.lang.annotation.Annotation;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.Field;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Supplier;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.PARAMETER})
public @interface Min {
	int value();

	String msg() default "%d보다는 거야합니다.";

	class Validate {
		public static String validate(Field f, Object fval) {
			Min annotation = f.getAnnotation(Min.class);
			// Function<Min, String> msg = Min::msg;
			int value = annotation.value();
			int v = fval instanceof Number num ? num.intValue() :
				Optional.ofNullable(fval).orElse("").toString().length();

			Function<Annotation, String> msgFn = a -> String.format(((Min)a).msg(), value);

			Supplier<Boolean> checker = () -> v < value;
			return Validator.validate(f, fval, Min.class, msgFn, checker);
		}

	}

}
