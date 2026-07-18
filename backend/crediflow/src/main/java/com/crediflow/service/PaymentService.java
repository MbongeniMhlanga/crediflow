package com.crediflow.service;

import com.crediflow.dto.PaymentCreateRequest;
import com.crediflow.dto.PaymentDTO;
import com.crediflow.entity.Loan;
import com.crediflow.entity.Payment;
import com.crediflow.entity.RepaymentSchedule;
import com.crediflow.exception.BadRequestException;
import com.crediflow.exception.ResourceNotFoundException;
import com.crediflow.repository.LoanRepository;
import com.crediflow.repository.PaymentRepository;
import com.crediflow.repository.RepaymentScheduleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final LoanRepository loanRepository;
    private final RepaymentScheduleRepository repaymentScheduleRepository;

    public PaymentService(PaymentRepository paymentRepository, LoanRepository loanRepository, RepaymentScheduleRepository repaymentScheduleRepository) {
        this.paymentRepository = paymentRepository;
        this.loanRepository = loanRepository;
        this.repaymentScheduleRepository = repaymentScheduleRepository;
    }

    public List<PaymentDTO> getPaymentsByLoanId(Long loanId) {
        return paymentRepository.findByLoanId(loanId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public PaymentDTO createPayment(PaymentCreateRequest request) {
        Loan loan = loanRepository.findById(request.getLoanId())
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));
        if (request.getAmount() == null || request.getAmount().compareTo(java.math.BigDecimal.ZERO) <= 0) {
            throw new BadRequestException("Payment amount must be positive");
        }

        Payment payment = new Payment();
        payment.setLoan(loan);
        payment.setAmount(request.getAmount());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setStatus(Payment.PaymentStatus.COMPLETED);

        loan.setOutstandingBalance(loan.getOutstandingBalance().subtract(request.getAmount()).max(java.math.BigDecimal.ZERO));
        if (loan.getOutstandingBalance().compareTo(java.math.BigDecimal.ZERO) <= 0) {
            loan.setStatus(Loan.LoanStatus.CLOSED);
        }
        loanRepository.save(loan);

        repaymentScheduleRepository.findByLoanIdOrderByInstallmentNumberAsc(loan.getId())
                .stream()
                .filter(row -> row.getStatus() == RepaymentSchedule.ScheduleStatus.PENDING)
                .findFirst()
                .ifPresent(row -> {
                    if (request.getAmount().compareTo(row.getTotalAmount()) >= 0) {
                        row.setStatus(RepaymentSchedule.ScheduleStatus.PAID);
                    }
                    repaymentScheduleRepository.save(row);
                });

        return toDTO(paymentRepository.save(payment));
    }

    private PaymentDTO toDTO(Payment payment) {
        return new PaymentDTO(payment.getId(), payment.getLoan().getId(), payment.getAmount(), payment.getPaymentDate(), payment.getStatus());
    }
}
