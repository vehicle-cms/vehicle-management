package com.app.entities;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Roles")
@NoArgsConstructor
@Getter
@Setter
public class Role extends BaseEntity {
	
	@Enumerated(EnumType.STRING) 
	@Column(length = 20,name="role_name")
	private ERole roleName;
		
}
