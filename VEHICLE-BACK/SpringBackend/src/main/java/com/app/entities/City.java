package com.app.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "city")
@Getter
@Setter
@NoArgsConstructor
public class City {

    @Id
    private String pincode; 

    private String name;

    private String description;

    private String branchType;

    private String deliveryStatus;

    private String circle;

    private String district;

    private String division;

    private String region;

    private String block;

    private String state;

    private String country;
}
