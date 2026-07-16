package com.crediflow.dto;

import com.crediflow.entity.Payment.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {
    private Long id;
    private Long loanId;
    private BigDecimal amount;
    private LocalDateTime paymentDate;
    private PaymentStatus status;
}