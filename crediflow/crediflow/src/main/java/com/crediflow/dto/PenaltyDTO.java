package com.crediflow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PenaltyDTO {
    private Long id;
    private Long loanId;
    private BigDecimal amount;
    private String reason;
    private LocalDateTime appliedDate;
}