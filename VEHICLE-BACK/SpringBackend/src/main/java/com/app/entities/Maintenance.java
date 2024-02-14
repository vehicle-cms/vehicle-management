package com.app.entities;

import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Maintenance extends BaseEntity {


    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    @ToString.Exclude
    private Vehicle vehicle;

    private boolean status;

    @ManyToMany
    @JoinTable(name = "maintenance_part", joinColumns = @JoinColumn(name = "maintenance_id", nullable = false), inverseJoinColumns = @JoinColumn(name = "part_id", nullable = false))
    @ToString.Exclude
    private List<Part> parts;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;
}

