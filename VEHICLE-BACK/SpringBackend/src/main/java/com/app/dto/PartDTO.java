package com.app.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.app.entities.OrderStatus;
import com.app.entities.Part;
import com.app.entities.Rating;
import com.app.entities.User;
import com.app.entities.Vehicle;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PartDTO {
	
	@JsonProperty(access = Access.READ_WRITE)
    private Long id;
	private String name;

    private double price;
}
