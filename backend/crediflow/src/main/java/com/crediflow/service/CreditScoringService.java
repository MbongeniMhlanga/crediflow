package com.crediflow.service;

import com.crediflow.dto.CreditDecisionDTO;
import com.crediflow.entity.LoanApplication;
import com.crediflow.entity.LoanProduct;
import com.crediflow.entity.User;
import com.crediflow.exception.BadRequestException;
import com.crediflow.repository.CreditScoreRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class CreditScoringService {
    private final CreditScoreRepository creditScoreRepository;

    @Value("${credit.score.base}")
    private int baseScore;

    @Value("${credit.score.max}")
    private int maxScore;

    @Value("${credit.score.min-approve}")
    private int minimumApprovalScore;

    @Value("${credit.score.employment.full-time}")
    private int fullTimeBonus;

    @Value("${credit.score.employment.part-time}")
    private int partTimeBonus;

    @Value("${credit.score.employment.self-employed}")
    private int selfEmployedBonus;

    @Value("${credit.score.employment.unemployed}")
    private int unemployedBonus;

    @Value("${credit.score.income.coverage-ideal}")
    private BigDecimal idealCoverage;

    @Value("${credit.score.income.coverage-threshold}")
    private BigDecimal thresholdCoverage;

    @Value("${credit.score.loan-amount.penalty-factor}")
    private BigDecimal amountPenaltyFactor;

    @Value("${credit.score.term.penalty-factor}")
    private BigDecimal termPenaltyFactor;

    @Value("${credit.score.interest-bonus-factor}")
    private BigDecimal interestBonusFactor;

    public CreditScoringService(CreditScoreRepository creditScoreRepository) {
        this.creditScoreRepository = creditScoreRepository;
    }

    public CreditDecisionDTO evaluate(User user, LoanApplication application, LoanProduct product, BigDecimal monthlyInstallment) {
        if (user.getMonthlyIncome() == null || user.getEmploymentStatus() == null || user.getEmploymentStatus().isBlank()) {
            throw new BadRequestException("Borrower profile is incomplete. Monthly income and employment status are required.");
        }

        BigDecimal income = user.getMonthlyIncome();
        BigDecimal coverage = income.divide(monthlyInstallment, 4, RoundingMode.HALF_UP);

        int score = baseScore;
        score += employmentBonus(user.getEmploymentStatus());

        if (coverage.compareTo(idealCoverage) >= 0) {
            score += 120;
        } else if (coverage.compareTo(thresholdCoverage) >= 0) {
            score += 70;
        } else {
            score -= 80;
        }

        BigDecimal amountPenalty = application.getAmountRequested().multiply(amountPenaltyFactor);
        score -= amountPenalty.setScale(0, RoundingMode.HALF_UP).intValue();
        score -= BigDecimal.valueOf(application.getTermMonths()).multiply(termPenaltyFactor).setScale(0, RoundingMode.HALF_UP).intValue();
        score += product.getInterestRate().multiply(interestBonusFactor).setScale(0, RoundingMode.HALF_UP).intValue();

        score = Math.min(score, maxScore);

        com.crediflow.entity.CreditScore.RiskLevel riskLevel =
                score >= 750 ? com.crediflow.entity.CreditScore.RiskLevel.LOW :
                score >= 650 ? com.crediflow.entity.CreditScore.RiskLevel.MEDIUM :
                score >= 550 ? com.crediflow.entity.CreditScore.RiskLevel.HIGH :
                com.crediflow.entity.CreditScore.RiskLevel.VERY_HIGH;

        boolean eligible = score >= minimumApprovalScore && coverage.compareTo(thresholdCoverage) >= 0;
        String reason = eligible ? "Meets configured score and income coverage thresholds" : "Does not meet score or affordability thresholds";

        return new CreditDecisionDTO(
                user.getId(),
                application.getId(),
                score,
                riskLevel,
                eligible,
                reason,
                income,
                monthlyInstallment
        );
    }

    private int employmentBonus(String status) {
        String normalized = status.trim().toUpperCase();
        return switch (normalized) {
            case "FULL_TIME" -> fullTimeBonus;
            case "PART_TIME" -> partTimeBonus;
            case "SELF_EMPLOYED" -> selfEmployedBonus;
            case "UNEMPLOYED" -> unemployedBonus;
            default -> 0;
        };
    }
}
