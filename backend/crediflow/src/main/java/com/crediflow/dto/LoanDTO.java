package com.crediflow.dto;

import com.crediflow.entity.Loan.LoanStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanDTO {
    private Long id;
    private Long applicationId;
    private Long userId;
    private BigDecimal principalAmount;
    private BigDecimal interestRate;
    private Integer termMonths;
    private BigDecimal monthlyPayment;
    private BigDecimal outstandingBalance;
    private LoanStatus status;
    private LocalDate startDate;
    private LocalDate endDate;
}