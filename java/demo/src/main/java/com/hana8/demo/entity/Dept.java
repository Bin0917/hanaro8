package com.hana8.demo.entity;

import java.util.ArrayList;
import java.util.List;

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
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
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
	@UniqueConstraint(name = "unique_Dept_dept", columnNames = {"dept"})
})
public class Dept extends BaseEntity {
	@Id
	@Column(columnDefinition = "int unsigned", updatable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	private String name;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "captain", nullable = false,
		foreignKey = @ForeignKey(name = "fk_Dept_captain_Member")
	)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Member captain;

	@ManyToMany
	@JoinTable(name = "deptMembers",
		foreignKey = @ForeignKey(name = "fk_Dept_deptMembers_Member"),
		joinColumns = @JoinColumn(name = "dept"),
		inverseJoinColumns = @JoinColumn(name = "member")
	)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Member> deptMembers = new ArrayList<>();
}
