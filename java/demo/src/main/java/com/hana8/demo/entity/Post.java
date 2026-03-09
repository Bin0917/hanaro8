package com.hana8.demo.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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

	// @OneToOne(mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	// owner의 post 필드랑 맵핑된다!
	@OneToOne(mappedBy = "post", cascade = CascadeType.ALL) //one to one 은 all로 하고 나머지 상태일때 위 처럼 걸어라
	private PostBody body;

	// @Column(length = 31, nullable = false)
	// private String writer;

	@ManyToOne(fetch = FetchType.EAGER) // 무조건 만들겠다? 목록에서 필요할때는 사용!
	@JoinColumn(name = "writer", nullable = false, foreignKey = @ForeignKey(name = "fk_Post_Member"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Member writer;

	@ManyToMany
	private List<Hashtag> hashtags = new ArrayList<>();

	@OneToMany(mappedBy = "post")
	@Builder.Default
	private List<Reply> replies = new ArrayList<>();

	public Post(String title, Member writer) {
		this.title = title;
		this.writer = writer;
		this.body = new PostBody("body of " + title);
	}

	// 편의 메서드
	public void setBody(PostBody body) {
		this.body = body;
		if (body != null)
			body.setPost(this);
	}
}
