package org.hana8.trythis;

import java.lang.reflect.Field;

public class Reflects {
	public static void validate(Object obj) {
		Class<?> clz = obj.getClass();

		for (Field f : clz.getDeclaredFields()) {
			f.setAccessible(true);

			if (f.isAnnotationPresent(NotNull.class)) {

			}
		}

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
		Reflection r = new Reflection(5, "");
		String[] msg = Reflects.validate(r);
		System.out.println("before = " + r);
		Reflects.makeNotNullFields(r);
		System.out.println("after = " + r);
	}
}
