package org.hana8.Annotations;

public class AnnotationException extends IllegalStateException {
	public AnnotationException(String msg) {
		super("Annotation Error: " + msg);
	}
}
