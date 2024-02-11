package com.app.dto;

import javax.validation.constraints.Pattern;

import com.app.entities.FuelType;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class VehicleDTO {
	@JsonProperty(access = Access.READ_ONLY) //skipped during de-serialization
	private Long id;
	private String name;
	private String model;
	//@Pattern(regexp = "^[A-Z]{2}[0-9]{2}[A-HJ-NP-Z]{1,2}[0-9]{4}$", message = "Invalid Vehicle Number Format")
	private String vehicleNumber;
	private String registration;
	private boolean status;
	private double mileage;
	private double ratePerDay;
	private FuelType fuelType;
}
