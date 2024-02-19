package com.app.dto;


import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginDTO {


	private UserDTO user;
	@NotBlank
	private String username;
	@NotBlank
	private String password;

}
