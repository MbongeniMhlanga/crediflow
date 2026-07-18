package com.crediflow.dto;

import com.crediflow.entity.CreditScore.RiskLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditDecisionDTO {
    private Long userId;
    private Long applicationId;
    private Integer score;
    private RiskLevel riskLevel;
    private boolean eligible;
    private String reason;
    private BigDecimal monthlyIncome;
    private BigDecimal monthlyInstallment;
}
