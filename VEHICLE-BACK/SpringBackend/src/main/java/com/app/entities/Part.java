package com.app.entities;

import java.util.List;

import javax.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
//@ToString(callSuper = true)
//@EqualsAndHashCode(callSuper = true)
public class Part extends BaseEntity {

	@Column(length=20)
    private String name;

    private double price;
    
    @ManyToMany(cascade = {CascadeType.MERGE})
    @JoinTable(name = "maintenance_part", joinColumns = @JoinColumn(name = "part_id", nullable = false), inverseJoinColumns = @JoinColumn(name = "maintenance_id", nullable = false))
    @ToString.Exclude
    private List<Maintenance> maintenance;

}
