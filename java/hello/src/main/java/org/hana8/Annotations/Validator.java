package org.hana8.Annotations;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.function.Function;
import java.util.function.Supplier;

public class Validator {
	public static String validate(Field f, Object fval, Class<? extends Annotation> annCls,
		Function<Annotation, String> msgFn, Supplier<Boolean> checker) {

		try {
			Annotation annotation = f.getAnnotation(annCls);
			// int value = annotation.value();
			Object value = null;

			if (checker.get()) {
				// return String.format(msgFn.apply(annotation), value);
				return msgFn.apply(annotation);
			}
		} catch (Exception e) {
			throw new AnnotationException(e.getMessage());
		}
		return null;
	}
}
