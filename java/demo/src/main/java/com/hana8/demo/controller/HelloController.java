package com.hana8.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j // private static... log 를 대신해주는 어노테이션
@RestController
public class HelloController {
	// 대부분 getLogger 내부는 "클래스이름".class로 함
	// private static final Logger log = LoggerFactory.getLogger(HelloController.class);

	public HelloController() {
		log.debug("Constructor of HelloController..."); // 얘가 만드는게 아니라, 스프링이 해주는거임 (ioc)
	}

	@GetMapping("/")
	public String index(@RequestHeader("User-Agent") String userAgent) {
		return "Hana8 demo" + userAgent;
	}

	@GetMapping("/hello")
	public String Hello() {
		return "Hello World!";
	}

	@GetMapping("/hello-servlet")
	public String helloServlet(String name) {
		// 중괄호 == %s, %d 같은 느낌
		log.info("INFO : {} - {}", name, 123);
		log.debug("DEBUG : "); // 찍을때마다 +연산이 들어가서 좋지 않음.
		log.warn("WARN : warning");
		log.error("ERROR");
		return "HIHI~" + name;
	}
}
