package com.app.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Orders extends BaseEntity {

    @Column(name = "booking_date")
    private Date bookingDate;

    @Column(name = "return_date")
    private Date returnDate;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "order_status")
    private OrderStatus status;

    private double fare;

    private double distance;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
//    @JsonProperty("vehicle_id")
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "driver_id")
//    @JsonProperty("driver_id")
    private User driver;

    @ManyToOne
    @JoinColumn(name = "customer_id")
//    @JsonProperty("customer_id")
    private User customer;

    @ManyToOne
    @JoinColumn(name = "manager_id")
//    @JsonProperty("manager_id")
    private User manager;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rating_id",nullable=true)
//    @JsonProperty("rating_id")
    private Rating rating;
}
