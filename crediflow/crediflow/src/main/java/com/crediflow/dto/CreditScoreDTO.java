package com.crediflow.dto;

import com.crediflow.entity.CreditScore.RiskLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditScoreDTO {
    private Long id;
    private Long userId;
    private Integer score;
    private RiskLevel riskLevel;
    private LocalDateTime calculatedAt;
}