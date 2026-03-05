package com.hana8.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Lazy
@Getter
@Setter
public class LazyCallService {
	// @Value("default namee is Hone") // 이름 따로 안주면 얘로 넣겠다~
	// @Value("${HOME}") // 루트 home의 주소를 가져옴?
	@Value("${db.user}") // => application.yml 에 있는 정보를 가져옴
	private String name;

	@Value("${db.password}")
	private String password;

	@Value("${mail.user}")
	private String emailName;

	@Value("${mail.password}")
	private String emailPassword;

	// @Value("33") => 이거 int로 자동캐스팅됨 ㅇㅇ
	// private int age;

	public LazyCallService() {
		System.out.println("------------- lazy 생성");
	}

	public String call() {
		return "lazy sleep"; // 새로운 이벤티 있을때만 돌아라
	}
}
