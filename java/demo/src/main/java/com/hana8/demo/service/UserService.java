package com.hana8.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hana8.demo.dto.User;
import com.hana8.demo.repository.UserRepository;

@Service
public class UserService {
	private final UserRepository userRepository;

	public UserService(UserRepository repository) {
		this.userRepository = repository;
	}

	public List<User> getUsers() {
		return userRepository.findAllUsers();
	}

	public Long registUser(User user) {
		return userRepository.createUser(user);
	}

	public User editUser(User user) {
		return userRepository.updateUser(user);
	}

	public Integer removeUser(Integer id) {
		return userRepository.deleteUser(id);
	}

	public User getUser(Integer id) {
		return userRepository.findUserById(id);
	}
}
