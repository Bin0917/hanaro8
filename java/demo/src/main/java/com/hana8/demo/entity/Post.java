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
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(of = {"id", "title"}) // 💡 깔끔하게 id와 제목만!
@EqualsAndHashCode(of = "id", callSuper = false) // 💡 id로만 비교하면 절대 안 꼬여요!
public class Post extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "int unsigned")
	private Long id;

	private String title;

	@OneToOne(mappedBy = "post", cascade = CascadeType.ALL)
	private PostBody body;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "writer", nullable = false, foreignKey = @ForeignKey(name = "fk_Post_Member"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Member writer;

	@ManyToMany
	@Builder.Default
	private List<Hashtag> hashtags = new ArrayList<>();

	@OneToMany(mappedBy = "post")
	@Builder.Default
	private List<Reply> replies = new ArrayList<>();

	public Post(String title, Member writer) {
		this.title = title;
		this.writer = writer;
		this.body = new PostBody("body of " + title);
		this.body.setPost(this);
	}

	public void setBody(PostBody body) {
		this.body = body;
		if (body != null)
			body.setPost(this);
	}
}
