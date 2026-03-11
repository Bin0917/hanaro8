package com.hana8.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hana8.demo.entity.Dept;

import jakarta.transaction.Transactional;

public interface DeptRepository extends JpaRepository<Dept, Integer> {
	List<Dept> findByCaptainId(@Param("id") Long memberId);

	// 쿼리 연습도 필요
	@Query("select d from Dept d inner join d.deptMembers m where m.id = :id")
	List<Dept> findByMemberId(@Param("id") Long deptId);

	// queryDsl ....
	@Query("select d.id, d.name, count(m) as memberCnt from Dept d inner join d.deptMembers m where m.id = :id group by d.id, d.name")
	List<Object[]> findByDeptMemberCountId();

	@Query("delete from Dept where id = :id")
	@Transactional
	@Modifying
	int deleteByDeptId(@Param("id") Integer id);
}
