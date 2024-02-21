package com.app.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MaintenanceDTO {
	
	@JsonProperty(access = Access.READ_ONLY)
    private Long id;
	
	
	private VehicleDTO vehicle;
	
	private boolean status;
	
		 
	private List<PartDTO> parts;
	@JsonProperty(access = Access.WRITE_ONLY)
	private List<Long> partsList;
	
	private Date startDate;
	
		
	private Date endDate;
	
	private double total;

}
