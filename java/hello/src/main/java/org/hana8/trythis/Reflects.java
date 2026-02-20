package org.hana8.trythis;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hana8.Annotations.AnnotationException;
import org.hana8.Annotations.In;
import org.hana8.Annotations.Max;
import org.hana8.Annotations.Min;
import org.hana8.Annotations.NotNull;

public class Reflects {
	public static Map<String, List<String>> validate(Object obj) {
		Map<String, List<String>> msgs = new HashMap<>();

		try {
			for (Field f : obj.getClass().getDeclaredFields()) {
				f.setAccessible(true);
				Annotation[] annotations = f.getAnnotations();
				if (annotations.length == 0)
					continue;

				String fname = f.getName();
				Object fval = f.get(obj);

				// if 를 switch로 바꾸기!! 걍 이따 통으로 다시 돌림서 따라가자

				for (Annotation ann : annotations) {
					String msg = switch (ann.annotationType().getSimpleName()) {
						case "NotNull" -> {
							if (fval != null)
								yield null;
							NotNull annotation = f.getAnnotation(NotNull.class);
							yield annotation.value();
						}
						case "Min" -> Min.Validate.validate(f, fval);
						case "Max" -> Max.Validate.validate(f, fval);
						case "In" -> In.Validate.validate(f, fval);
						default -> throw new AnnotationException("Unknown Annotation..");
					};

					if (msg != null) {
						msgs.computeIfAbsent(fname, k -> new ArrayList<>());
						msgs.get(fname).add(msg);
					}
				}

			}

		} catch (Exception e) {
			throw new AnnotationException(e.getMessage());
		}
		return msgs;
	}

	public static void makeNotNullFields(Object obj) {
		Class<?> cls = obj.getClass();
		makeNotNullFields(cls, obj);
	}

	public static void makeNotNullFields(Class<?> cls, Object obj) { // try/catch 로 잡거나, 함수에 exception 처리 해주어야 함.
		if (cls == Object.class | obj == null)
			return;

		for (Field f : cls.getDeclaredFields()) {
			try {
				// for (Field f : obj.getClass().getDeclaredFields()) {
				f.setAccessible(true);
				if (f.get(obj) != null)
					continue;
				switch (f.getType().getSimpleName()) {
					case "String" -> f.set(obj, "");
					case "Boolean" -> f.set(obj, false);
					case "Integer" -> f.set(obj, 0);
					case "Double" -> f.set(obj, 0.0);
					case "Byte" -> f.set(obj, (byte)0);
					case "Character" -> f.set(obj, '0');
					case "Short" -> f.set(obj, (short)0);
					case "float" -> f.set(obj, 0.0f);
					case "long" -> f.set(obj, 0L);
					default -> {
						if (f.getType().isEnum()) { // enum일땐 newInstance 안된다
							Object[] enums = f.getType().getEnumConstants();
							if (enums.length > 0)
								f.set(obj, enums[0]);
						} else {
							Object o = f.getType().getDeclaredConstructor().newInstance();
							f.set(obj, o);
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace(System.out);
			}
		}
		makeNotNullFields(cls.getSuperclass(), obj);
	}

	public static void main(String[] args) throws IllegalAccessException {
		// Reflection r = new Reflection();
		Reflection r = new Reflection();
		System.out.println("before = " + r);
		Reflects.makeNotNullFields(r);
		System.out.println("after = " + r);

		System.out.println("=========================");
		Reflection r2 = new Reflection(5, "dddd");
		// Reflection r2 = new Reflection(null, null);
		Map<String, List<String>> msg = Reflects.validate(r2);
		System.out.println(msg);
	}
}
