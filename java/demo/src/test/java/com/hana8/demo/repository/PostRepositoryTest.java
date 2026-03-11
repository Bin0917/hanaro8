package com.hana8.demo.repository;

import static org.assertj.core.api.Assertions.*;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.LongStream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.hana8.demo.common.enums.BloodType;
import com.hana8.demo.entity.Member;
import com.hana8.demo.entity.Post;
import com.hana8.demo.entity.PostBody;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class PostRepositoryTest extends BaseRepositoryTest {
	private static long id;
	private static long orgCnt = 0;
	private static Member member;

	@Autowired
	private PostRepository repository;

	@Autowired
	private MemberRepository memberRepository;

	@BeforeEach
	void setOrgCnt() {
		if (member == null) {
			member = memberRepository.findById(1L).orElseGet(() -> {
				Member newMember = Member.builder()
					.nickname("postTester")
					.email("postTester@test.com")
					.bloodType(BloodType.A)
					.isActive(true)
					.build();
				return memberRepository.save(newMember);
			});
		}

		if (orgCnt == 0)
			orgCnt = repository.count();
	}

	@Test
	@Order(4)
	void createAllTest() {
		long cnt = repository.count();
		if (cnt > 3)
			return;
		List<Post> posts = LongStream.rangeClosed(4, 100)
			.mapToObj(l -> {
				PostBody postBody = new PostBody("body of " + l);
				Post post = Post.builder()
					.title("Title" + l)
					.body(postBody)
					.writer(member)
					.build();

				postBody.setPost(post);

				return post;
			}).toList();

		repository.saveAll(posts);

		assertThat(repository.count()).isEqualTo(cnt + 97);
	}

	@Test
	@Order(5)
	void pagingTest() {
		Sort sort = Sort.by("id").descending();
		Pageable pager = PageRequest.of(0, 10, sort);
		// Sort sort1 = Sort.by("createdAt").descending();
		// Sort sort2 = Sort.by("title").ascending();
		// Pageable pager = PageRequest.of(0, 10, sort1.and(sort2));

		Page<Post> page1 = repository.findAll(pager);
		List<Post> posts = page1.getContent();
		posts.stream().mapToLong(Post::getId).forEach(System.out::println);
		// posts.forEach(p -> System.out.println(p.getCreatedAt() + " -- " + p.getTitle()));
		System.out.println("page1.getTotalPages() = " + page1.getTotalPages());
		assertThat(page1.getTotalPages()).isGreaterThanOrEqualTo(0);
		System.out.println("page1.getNumber() = " + page1.getNumber());
		assertThat(page1.getNumber()).isEqualTo(0);
		System.out.println("page1.getTotalElements() = " + page1.getTotalElements());
		System.out.println("page1.getSize() = " + page1.getSize());
		System.out.println("page1.isFirst() = " + page1.isFirst());
		System.out.println("page1.isLast() = " + page1.isLast());

		Page<Post> page2 = repository.findAll(page1.nextPageable());
		System.out.println("page2.getNumber() = " + page2.getNumber());

		if (!page1.isEmpty() && !page2.isEmpty()) {
			assertThat(page1.getContent()).doesNotContainAnyElementsOf(page2.getContent());
		}

		if (page2.isLast())
			return;

		Page<Post> page3 = repository.findAll(page2.nextOrLastPageable());
		System.out.println("page3.getNumber() = " + page3.getNumber());

		// sort test
		assertThat(page3.getContent()).isSortedAccordingTo(
			Comparator.comparingLong(Post::getId).reversed()
		);
	}

	@Test
	@Order(6)
	void titleLikeTest() {
		List<Post> posts = repository.findByTitleStartingWith("Title");
		System.out.println("posts = " + posts);
		assertThat(posts).isNotEmpty();
	}

	@Test
	@Order(7)
	void jpqlTest() {
		List<Post> byIdBetween = repository.findByIdBetween(1L, 100L);
		byIdBetween.stream().map(p -> p.getId() + " : " + p.getTitle())
			.forEach(System.out::println);

		List<Post> byAny = repository.findByAny(1, 100);
		byAny.stream().map(p -> p.getId() + " : " + p.getTitle()).forEach(System.out::println);

		List<Object[]> strings = repository.sortByCreatedAtAndTitle(1, 100);
		strings.forEach(a -> System.out.println(Arrays.toString(a)));
	}

	@Test
	@Order(1)
	void createTest() {
		Post newPost = new Post("Title 101", member);
		// Post 생성자에서 Body를 만들지만, Body에도 Post를 명시적으로 연결해줘야 함
		if (newPost.getBody() != null) {
			newPost.getBody().setPost(newPost);
		}
		Post savedPost = repository.save(newPost);
		Post post = repository.findById(savedPost.getId()).orElseThrow();
		assertThat(post.getTitle()).isEqualTo(savedPost.getTitle());
		id = post.getId();
	}

	@Test
	@Order(2)
	void updateTest() {
		Post post = repository.findById(id).orElseThrow();
		post.setTitle(post.getTitle() + "xxx");
		repository.save(post);

		Post post2 = repository.findById(id).orElseThrow();
		assertThat(post.getTitle()).isEqualTo(post2.getTitle());
	}

	@Test
	@Order(3)
	void deleteTest() {
		long cnt = repository.count();
		Post post = repository.findById(id).orElseThrow();
		repository.delete(post);
		assertThat(repository.count()).isEqualTo(cnt - 1);
	}

}