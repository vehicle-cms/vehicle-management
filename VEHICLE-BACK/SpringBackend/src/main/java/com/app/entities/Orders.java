package com.app.entities;

import javax.persistence.*;

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

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status")
    private OrderStatus status;

    private double fare;

    private double distance;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    @ToString.Exclude
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    @ToString.Exclude
    private User driver;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @ToString.Exclude
    private User customer;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    @ToString.Exclude
    private User manager;

    @OneToOne
    @JoinColumn(name = "rating_id",nullable=true)
    @ToString.Exclude
    @MapsId
    private Rating rating;
}
