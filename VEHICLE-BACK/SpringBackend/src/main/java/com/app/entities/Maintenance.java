package com.app.entities;

import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
//@EqualsAndHashCode(callSuper = true)
public class Maintenance extends BaseEntity {


    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    @ToString.Exclude
    private Vehicle vehicle;

    private boolean status;

    @ManyToMany(cascade = {CascadeType.MERGE})
    @JoinTable(name = "maintenance_part", joinColumns = @JoinColumn(name = "maintenance_id", nullable = false), inverseJoinColumns = @JoinColumn(name = "part_id", nullable = false))
    private List<Part> parts =new ArrayList<Part>();

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;
    
    
    
    public void addPart(Part part) {
    	
    	parts.add(part);
    	part.getMaintenance().add(this);
    	
    }
    public void removePart(Part part) {
    	parts.remove(part);
    	part.getMaintenance().remove(this);
    }
}

