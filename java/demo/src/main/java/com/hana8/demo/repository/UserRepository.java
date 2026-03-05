package com.hana8.demo.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.hana8.demo.dto.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class UserRepository {
	private final List<User> users = new ArrayList<>();

	public List<User> findAllUsers() {
		return users;
	}

	public Long createUser(User user) {
		Long id = users.stream().mapToLong(User::getId).max().orElse(0) + 1;
		user.setId(id);
		users.add(user);
		return id;
	}

	public User updateUser(User user) {
		log.debug("update = {}", user);
		return users.stream().filter(_user -> _user.getId() == (long)user.getId())
			.peek(oldUser -> {
				oldUser.setUsername(user.getUsername());
				oldUser.setEmail(user.getEmail());
				oldUser.setTel(user.getTel());
			}).findFirst().orElse(null);

		// User oldUser = users.stream().filter(u -> u.getId() == user.getId()).findFirst().orElse(null);
		//
		// if (oldUser == null)
		// 	return null;
		// oldUser.setUsername(user.getUsername());
		// oldUser.setEmail(user.getEmail());
		// oldUser.setTel(user.getTel());
		//
		// return oldUser;
	}

	public Integer deleteUser(Integer id) {
		return users.stream().filter(_user -> _user.getId() == (long)id).findFirst()
			.map(u -> {
				users.remove(u);
				return 1;
			}).orElse(0);
		// Optional<User> foundUser = users.stream().filter(_user -> _user.getId() == id).findFirst();
		// // return foundUser.ifPresentOrElse(users::remove, 0);
		//
		// if (foundUser.isEmpty())
		// 	return 0;
		//
		// foundUser.ifPresent(users::remove);
		// return 1;
	}

	public User findUserById(Integer id) {
		return users.stream().filter(u -> u.getId() == (long)id).findFirst().orElse(null);
	}
}
