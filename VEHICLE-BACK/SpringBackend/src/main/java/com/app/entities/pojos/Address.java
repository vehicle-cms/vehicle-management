package com.app.entities;

import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//import lombok.ToString;

@Entity
@Table(name = "address")
@NoArgsConstructor
@Getter
@Setter

public class Address extends BaseEntity {
	
	@Column(length = 50)
	private String street;
	
	@Column(length = 100)
	private String address;
	
	@ManyToOne 
	@JoinColumn(name = "pin_code", nullable = false)
	private City pincode;
	
}
