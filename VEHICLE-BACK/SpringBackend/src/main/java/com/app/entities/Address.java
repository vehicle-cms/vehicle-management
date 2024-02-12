package com.app.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Address extends BaseEntity {


    @Column
    private String street;

    @Column(name = "address")
    private String address;

    @ManyToOne 
	@JoinColumn(name = "pin_code", nullable = false)
    @ToString.Exclude
	private City pincode;

}
