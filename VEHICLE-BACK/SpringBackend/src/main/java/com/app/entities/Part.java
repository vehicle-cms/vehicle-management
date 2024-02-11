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
@ToString
public class Part extends BaseEntity {

	@Column(length=20)
    private String name;

    private double price;
    
    @ManyToMany(mappedBy = "parts")
    private List<Maintenance> maintenance;

}
