package com.app.entities;

import javax.persistence.*;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class Vehicle extends BaseEntity{

    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    private String model;

    @Column(name = "vehicle_number")
    private String vehicleNumber;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "vehicle_type")
    private VehicleType vehicleType;

    private String registration;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "vehicle_status")
    private VehicleStatus status;

    private double mileage;

    @Column(name = "rate_per_day")
    private double ratePerDay;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "fuel_type")
    private FuelType fuelType;

}
