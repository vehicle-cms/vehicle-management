package com.app.dto;

import java.util.Date;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.entities.Address;
import com.app.entities.Gender;
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
	
	@JsonProperty(access = Access.READ_WRITE) 
	private Long id;
	private String imageURL;
    private String firstName;
    private String lastName;
    @Email
    private String email;
    @NotBlank
    private String mobile;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createdOn;
    private boolean assigned;
    private double salary;
    private Address address;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Enumerated(EnumType.STRING)
    @NotBlank
    private Gender gender;

    
}
