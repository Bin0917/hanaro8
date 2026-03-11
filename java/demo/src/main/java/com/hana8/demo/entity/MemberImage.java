package com.hana8.demo.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Data
@ToString(exclude = "member")
@EqualsAndHashCode(exclude = "member")
public class MemberImage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String orgname;

	private String savedname;

	private String savedir;

	@ManyToOne()
	@JoinColumn(name = "member", nullable = false,
		foreignKey = @ForeignKey(name = "fk_MemberImage_member_Member")
	)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Member member;
}
