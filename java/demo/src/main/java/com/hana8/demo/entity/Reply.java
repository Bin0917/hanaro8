package com.hana8.demo.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Reply extends BaseEntity {

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "replier", nullable = false,
		foreignKey = @ForeignKey(name = "fk_Reply_replier_Member")
	)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Member replier;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "int unsigned")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "post",
		referencedColumnName = "id", columnDefinition = "int unsigned not null",
		foreignKey = @ForeignKey(name = "fk_Reply_post_Post"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	@ToString.Exclude // toString 으로 객체 -> json할때, 이 필드는 빼겠다~ => 순환참조방지
	private Post post;

	@Column(nullable = false)
	private String reply;

}
