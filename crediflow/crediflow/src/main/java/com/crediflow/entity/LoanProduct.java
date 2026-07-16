package com.crediflow.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "LOAN_PRODUCTS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "interest_rate", nullable = false, precision = 5, scale = 2)
    private BigDecimal interestRate;
    
    @Column(name = "max_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal maxAmount;
    
    @Column(name = "term_months", nullable = false)
    private Integer termMonths;
}