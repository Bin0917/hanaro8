package com.hana8.demo.entity;

import java.math.BigDecimal;

import org.hibernate.annotations.ColumnDefault;

import com.hana8.demo.common.enums.BloodType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Table(uniqueConstraints = {
	@UniqueConstraint(
		name = "unique_User_email",
		columnNames = {"email"}
	),
	@UniqueConstraint(
		name = "unique_User_telno",
		columnNames = {"username", "telno"}
	)
})
public class User extends BaseEntity {
	// 모든 데이터베이스는 id 가 필요!!
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	// 내가 타입을 직접 정의하고 싶을땐 columnDefinition 사용
	@Column(updatable = false, unique = true, columnDefinition = "int unsigned")
	private Long id;

	@Column(nullable = false, length = 31)
	private String username;

	@Enumerated(EnumType.STRING)
	private BloodType bloodType;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false, length = 12)
	private String telno;

	@Column(precision = 8, scale = 2, nullable = false)
	@ColumnDefault("0.0")
	private BigDecimal salhour;

	@Transient
	private int auth;

}
