package com.app.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class User extends BaseEntity {
    // user change

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "image_url")
    private String imageURL;

    @Column(length = 12)
    private String mobile;

    @Column(length = 20, unique = true)
    private String email;

    @Column(name = "created_on")
    private Date createdOn;

    private boolean assigned;

    private double salary;

    @OneToOne
    @JoinColumn(name = "address_id")
    @MapsId
    private Address address;

    @Enumerated(EnumType.STRING)
    private Role role;

}
