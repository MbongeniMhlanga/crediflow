package com.crediflow.util;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;

public class FinancialCalculationUtil {

    private FinancialCalculationUtil() {
    }

    public static BigDecimal calculateEMI(BigDecimal principal, BigDecimal annualInterestRate, int termMonths) {
        BigDecimal monthlyInterestRate = annualInterestRate.divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP)
                .divide(BigDecimal.valueOf(12), 10, RoundingMode.HALF_UP);

        if (monthlyInterestRate.compareTo(BigDecimal.ZERO) == 0) {
            return principal.divide(BigDecimal.valueOf(termMonths), 2, RoundingMode.HALF_UP);
        }

        BigDecimal onePlusRate = monthlyInterestRate.add(BigDecimal.ONE);
        BigDecimal power = onePlusRate.pow(termMonths, MathContext.DECIMAL128);

        BigDecimal numerator = principal.multiply(monthlyInterestRate).multiply(power);
        BigDecimal denominator = power.subtract(BigDecimal.ONE);

        return numerator.divide(denominator, 2, RoundingMode.HALF_UP);
    }
}