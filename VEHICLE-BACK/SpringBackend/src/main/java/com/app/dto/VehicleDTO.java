package com.app.dto;

import javax.validation.constraints.Pattern;

import com.app.entities.FuelType;
import com.app.entities.Part;
import com.app.entities.VehicleStatus;
import com.app.entities.VehicleType;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class VehicleDTO {
	@JsonProperty(access = Access.READ_WRITE) 
	private Long id;
	private String name;
	private String imageUrl;
	private String model;
	//@Pattern(regexp = "^[A-Z]{2}[0-9]{2}[A-HJ-NP-Z]{1,2}[0-9]{4}$", message = "Invalid Vehicle Number Format")
	private String vehicleNumber;
	private VehicleType vehicleType;
	private String registration;
	private VehicleStatus status;
	private double mileage;
	private double ratePerDay;
	private FuelType fuelType;
}
