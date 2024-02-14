package com.app.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

public class Order1DTO {
    @JsonProperty(access = Access.READ_ONLY)
    private Long id;
    private Date bookingDate;
    private Date returnDate;
    private boolean status;
    private double fare;
    private double distance;
    private int vehicle_id;
    private int driver_id;
    private int customer_id;
    private int manager_id;
}
