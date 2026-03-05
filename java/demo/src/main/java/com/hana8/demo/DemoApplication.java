package com.hana8.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(DemoApplication.class, args);

		// HelloController bean = ctx.getBean(HelloController.class);
		// log.debug("hello = {}", bean.Hello());
		//
		// HelloService helloService = (HelloService)ctx.getBean("hellodokey");
		// log.debug("helloService = {}", helloService.sayHello());
		//
		// GreetingService greetingService = ctx.getBean(GreetingService.class);
		// log.debug("greetingService = {}", greetingService.call());
		//
		// LazyCallService valuue = ctx.getBean(LazyCallService.class);
		// log.debug("value = {}", valuue.getName());
		// log.debug("value = {}", valuue.getPassword());
	}

}
