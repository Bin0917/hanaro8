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
	@UniqueConstraint(name = "unique_Dept_name", columnNames = {"name"})
})
public class Dept extends BaseEntity {
	@Id
	@Column(columnDefinition = "smallint unsigned", updatable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private String name;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "captain", referencedColumnName = "id",
		columnDefinition = "int unsigned",
		foreignKey = @ForeignKey(name = "fk_Dept_captain_Member")
	)
	@OnDelete(action = OnDeleteAction.SET_NULL) // 부서장 퇴사가능
	private Member captain;

	@ManyToMany
	@JoinTable(name = "deptMembers",
		joinColumns = @JoinColumn(name = "dept", foreignKey = @ForeignKey(name = "fk_DeptMembers_dept")),
		inverseJoinColumns = @JoinColumn(name = "member", foreignKey = @ForeignKey(name = "fk_DeptMembers_member",
			foreignKeyDefinition = "foreign key(dept) references Dept(id) on delete cascade"))
	)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@Builder.Default
	private List<Member> deptMembers = new ArrayList<>();

	// db에서 꺼낸 값을 set하지 못하므로 아래 로직으로 대체
	public void addMember(Member member) {
		if (deptMembers == null)
			deptMembers = new ArrayList<>();
		deptMembers.add(member);
	}
}
