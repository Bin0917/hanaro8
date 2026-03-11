package com.hana8.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana8.demo.entity.MemberImage;

public interface MemberImageRepository extends JpaRepository<MemberImage, Long> {
	// uuid 사용으로 savedname은 독립적임.
	MemberImage findBySavedname(String savedname);

	List<MemberImage> findByMemberId(Long memberId);
}
