package com.app.entities;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 18, message = "Rating must be at least 1")
    @Max(value = 120, message = "Rating must be less than or equal to 5")
    private int rating;

    private String comment;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
