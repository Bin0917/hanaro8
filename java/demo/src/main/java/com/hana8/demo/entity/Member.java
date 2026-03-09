package com.hana8.demo.entity;

import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import com.hana8.demo.common.enums.BloodType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Table(uniqueConstraints = {
	@UniqueConstraint(name = "unique_Member_email", columnNames = {"email"})
})
public class Member extends BaseEntity {
	@Id
	@Column(columnDefinition = "int unsigned", updatable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 30)
	private String nickname;

	@Column(nullable = false)
	private String email;

	@Column(length = 128)
	private String passwd;

	@Enumerated(EnumType.STRING)
	private BloodType bloodType;

	// 디폴트값 주기?
	@ColumnDefault("false")
	private Boolean isActive;

	// owner에서 fk로 연결된 필드를 적어야해
	@OneToMany(mappedBy = "captain")
	private List<Dept> captainDepts;

	@ManyToMany(mappedBy = "deptMembers")
	private List<Dept> memberDepts;
}
