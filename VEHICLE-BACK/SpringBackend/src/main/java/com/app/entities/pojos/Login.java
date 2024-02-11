package com.app.entities;

//import java.time.LocalDate;

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

public class Login extends BaseEntity {
	
	@OneToOne 
	@JoinColumn(name = "user_id", nullable = false)
	@MapsId
	private User user;
	
	@Column(length=30,name="password")
	private String password;

}
