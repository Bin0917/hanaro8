package com.hana8.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.hana8.demo.entity.Member;

// 기본적으로 다 JpaRepo 를 쓴다
// jpa를 상속해서 얘는 Bean 임
public interface MemberRepository extends JpaRepository<Member, Long>, QuerydslPredicateExecutor<Member> {

}
