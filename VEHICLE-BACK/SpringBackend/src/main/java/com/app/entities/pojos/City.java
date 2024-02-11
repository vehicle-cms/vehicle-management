package com.app.entities;



import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "city")
@Getter
@Setter
@NoArgsConstructor

public class City {
	
	@Id
	private String Pincode;
	
	private String Name;
	
	private String Description;
	
	private String BranchType;
	
	private String DeliveryStatus;
	
	private String Circle;
	
	private String District;
	
	private String Division;
	
	private String Region;
	
	private String Block;
	
	private String State;
	
	private String Country;
	 
	
}
