package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
//import javax.persistence.Embedded;
import javax.persistence.Entity;
//import javax.persistence.EnumType;
//import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
//import javax.persistence.Lob;
//import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//import lombok.ToString;

@Entity
@Table(name = "user")
@NoArgsConstructor
@Getter
@Setter

public class User extends BaseEntity {
	
	@Column(length = 20)
	private String firstName;
	
	@Column(length = 20)
	private String lastName;
	
	@Column(length = 12)
	private String mobile;
	
	@Column(length = 20, unique = true)
	private String email;
	

	@OneToOne 
	@JoinColumn(name = "role", nullable = false)
	@MapsId
	private Role role;
	
	private boolean assigned;
	
	private double salary;
	
	@Column(name="created_on")
	private LocalDate createdOn;
	
	@OneToOne 
	@JoinColumn(name = "address_id")
	@MapsId
	private Address address;

}
