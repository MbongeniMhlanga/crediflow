package com.crediflow.dto;

import com.crediflow.entity.LoanApplication.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanApplicationResponseDTO {
    private Long id;
    private Long userId;
    private Long productId;
    private String productName;
    private BigDecimal amountRequested;
    private Integer termMonths;
    private ApplicationStatus status;
    private String rejectionMessage;
    private LocalDateTime createdAt;
}