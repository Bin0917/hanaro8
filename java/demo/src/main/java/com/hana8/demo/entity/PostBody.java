package com.hana8.demo.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
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
@ToString(callSuper = true, exclude = "post")
@EqualsAndHashCode(callSuper = true, exclude = "post")
public class PostBody extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "int unsigned")
	private Long id;

	// @Id
	// private Long id;

	@OneToOne
	// @MapsId //부모거 같이 쓰는데, 확장성이 좀 떨어짐
	@JoinColumn(name = "post",
		referencedColumnName = "id", columnDefinition = "int unsigned not null",
		foreignKey = @ForeignKey(name = "fk_PostBody_Post"
			// foreignKeyDefinition = "on delete on update cascade")
		))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Post post;

	@Lob //text나 큰 값들을 가져옴
	@Column(columnDefinition = "text", nullable = false)
	private String body;

	public PostBody(String body) {
		this.body = body;
	}

	public void setPost(Post post) {
		this.post = post;
		if (post != null) {
			this.id = post.getId();
		}
	}
}
