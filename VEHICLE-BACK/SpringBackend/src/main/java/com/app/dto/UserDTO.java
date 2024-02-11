package com.app.dto;

import java.util.Date;



import com.app.entities.Address;
import com.app.entities.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
	
	@JsonProperty(access = Access.READ_ONLY) 
	private Long id;
	private String imageURL;
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private Date createdOn;
    private boolean assigned;
    private double salary;
    private Address address;
    private Role role;

}
