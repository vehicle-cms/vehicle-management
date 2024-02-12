package com.app.dto;

import java.util.Date;

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
public class OrderDTO {

    @JsonProperty(access = Access.READ_ONLY)
    private Long id;
    private Date bookingDate;
    private Date returnDate;
    private boolean status;
    private double fare;
    private double distance;
    private Vehicle vehicle;
    private User driver;
    private User customer;
    private User manager;
    private Rating rating;

}
