package org.hana8.Annotations;

import java.lang.annotation.Annotation;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.Field;
import java.util.Optional;
import java.util.function.Function;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.PARAMETER})
public @interface Max {
	int value();

	String msg() default "%d보다는 작아야합니다.";

	class Validate {
		public static String validate(Field f, Object fval) {
			// Function<Min, String> msg = Max::msg;
			int value = f.getAnnotation(Max.class).value();
			int v = fval instanceof Number num ? num.intValue() :
				Optional.ofNullable(fval).orElse("").toString().length();

			Function<Annotation, String> msgFn = a -> String.format(((Max)a).msg(), value);

			return Validator.validate(f, fval, Max.class, msgFn, () -> v > value);
		}
	}
}
