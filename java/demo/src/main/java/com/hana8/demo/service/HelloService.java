package com.hana8.demo.service;

import org.springframework.stereotype.Component;

@Component("hellodokey")
public class HelloService {
	public String sayHello() {
		return "Good morning";
	}
}
