package com.crediflow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanProductDTO {
    private Long id;
    private String name;
    private BigDecimal interestRate;
    private BigDecimal maxAmount;
    private Integer termMonths;
}