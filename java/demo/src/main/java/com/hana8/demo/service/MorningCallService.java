package com.hana8.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MorningCallService implements GreetingService {

	// @Autowired // 1번 방법
	private HelloService hellodokey;

	// @Autowired 2번
	// public GreetingService(HelloService hellodokey) {
	// 	this.hellodokey = hellodokey;
	// }

	@Autowired // 3번 이렇게 setter에 붙여도 됨!
	public void setHellodokey(HelloService hellodokey) {
		this.hellodokey = hellodokey;
	}

	@Override
	public String call() {
		return "Morning~";
	}

	@Override
	public String sayHello() {
		return "mmmm";
	}
}
