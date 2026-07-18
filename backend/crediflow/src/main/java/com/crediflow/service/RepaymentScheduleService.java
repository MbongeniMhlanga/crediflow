package com.crediflow.service;

import com.crediflow.dto.RepaymentScheduleDTO;
import com.crediflow.entity.Loan;
import com.crediflow.entity.RepaymentSchedule;
import com.crediflow.exception.ResourceNotFoundException;
import com.crediflow.repository.RepaymentScheduleRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RepaymentScheduleService {
    private final RepaymentScheduleRepository repaymentScheduleRepository;

    public RepaymentScheduleService(RepaymentScheduleRepository repaymentScheduleRepository) {
        this.repaymentScheduleRepository = repaymentScheduleRepository;
    }

    public List<RepaymentScheduleDTO> getScheduleByLoanId(Long loanId) {
        return repaymentScheduleRepository.findByLoanIdOrderByInstallmentNumberAsc(loanId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<RepaymentSchedule> generateSchedule(Loan loan) {
        List<RepaymentSchedule> schedule = new java.util.ArrayList<>();
        BigDecimal remaining = loan.getPrincipalAmount();
        BigDecimal monthlyPayment = loan.getMonthlyPayment();
        BigDecimal monthlyRate = loan.getInterestRate().divide(BigDecimal.valueOf(100), 10, java.math.RoundingMode.HALF_UP)
                .divide(BigDecimal.valueOf(12), 10, java.math.RoundingMode.HALF_UP);

        for (int i = 1; i <= loan.getTermMonths(); i++) {
            BigDecimal interest = remaining.multiply(monthlyRate).setScale(2, java.math.RoundingMode.HALF_UP);
            BigDecimal principal = monthlyPayment.subtract(interest).max(BigDecimal.ZERO).setScale(2, java.math.RoundingMode.HALF_UP);
            if (i == loan.getTermMonths()) {
                principal = remaining.setScale(2, java.math.RoundingMode.HALF_UP);
            }
            BigDecimal total = principal.add(interest).setScale(2, java.math.RoundingMode.HALF_UP);

            RepaymentSchedule row = new RepaymentSchedule();
            row.setLoan(loan);
            row.setInstallmentNumber(i);
            row.setDueDate(loan.getStartDate().plusMonths(i));
            row.setPrincipalAmount(principal);
            row.setInterestAmount(interest);
            row.setTotalAmount(total);
            row.setStatus(RepaymentSchedule.ScheduleStatus.PENDING);
            schedule.add(row);

            remaining = remaining.subtract(principal).max(BigDecimal.ZERO);
        }

        return repaymentScheduleRepository.saveAll(schedule);
    }

    private RepaymentScheduleDTO toDTO(RepaymentSchedule schedule) {
        return new RepaymentScheduleDTO(
                schedule.getId(),
                schedule.getLoan().getId(),
                schedule.getInstallmentNumber(),
                schedule.getDueDate(),
                schedule.getPrincipalAmount(),
                schedule.getInterestAmount(),
                schedule.getTotalAmount(),
                schedule.getStatus()
        );
    }
}
