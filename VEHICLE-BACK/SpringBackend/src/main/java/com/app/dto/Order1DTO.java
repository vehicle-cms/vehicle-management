package com.app.dto;

import java.math.BigInteger;
import java.util.Date;

import com.app.entities.OrderStatus;
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
public class Order1DTO {
    @JsonProperty(access = Access.READ_ONLY)
    private Long id;
    private Date bookingDate;
    private Date returnDate;
    private OrderStatus status;
    private double fare;
    private double distance;
    private Vehicle  vehicle_id;
    private User  driver_id;
    private User  customer_id;
    private User  manager_id;
    private Rating  rating_id;
}
