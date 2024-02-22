package com.app.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Login extends BaseEntity {
	
	@OneToOne (cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", nullable = false)
	@MapsId
	private User user;
	
	@Column(length = 20, unique = true)
	private String username;
	
	@Column(name="password")
	private String password;

}
