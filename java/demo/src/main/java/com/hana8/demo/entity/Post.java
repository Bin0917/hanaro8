package com.hana8.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Post extends BaseEntity {
	// @Id
	// @GeneratedValue(strategy = GenerationType.UUID)
	// @UuidGenerator
	// private String id;

	// @Tsid //
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "int unsigned")
	private Long id;

	private String title;

	@Column(length = 2000)
	private String body;

	@Column(length = 31, nullable = false)
	private String writer;

	public Post(String title, String writer) {

		this.title = title;
		this.writer = writer;
		this.body = "body of " + writer;
	}
}
