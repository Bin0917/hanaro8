package com.hana8.demo.service;

import org.springframework.stereotype.Component;

@Component
public class EagerCallService {
	public EagerCallService() {
		System.out.println("------------- eager 생성");
	}
}
