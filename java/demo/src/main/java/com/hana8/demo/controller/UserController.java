package com.hana8.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hana8.demo.dto.User;
import com.hana8.demo.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
// @RequiredArgsConstructor
public class UserController {
	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/{id}")
	public User getDetail(@PathVariable Integer id) {
		return userService.getUser(id);
	}

	@GetMapping("")
	public List<User> getList() {
		return userService.getUsers();
	}

	@PostMapping("")
	public Long addUser(@Valid @RequestBody User user) {
		return userService.registUser(user);
	}

	@PutMapping("/{id}")
	public User editUser(@RequestBody User user) {
		// user.setId(id);
		return userService.editUser(user);
	}

	@DeleteMapping("/{id}")
	public Integer withdraw(@PathVariable Integer id) {
		return userService.removeUser(id);
	}
}
