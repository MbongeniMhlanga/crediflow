package com.crediflow.service;

import com.crediflow.dto.LoanApplicationRequestDTO;
import com.crediflow.dto.LoanApplicationResponseDTO;
import com.crediflow.entity.*;
import com.crediflow.entity.LoanApplication.ApplicationStatus;
import com.crediflow.exception.BadRequestException;
import com.crediflow.exception.ResourceNotFoundException;
import com.crediflow.mapper.LoanApplicationMapper;
import com.crediflow.repository.*;
import com.crediflow.util.FinancialCalculationUtil;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoanApplicationService {
    private final LoanApplicationRepository loanApplicationRepository;
    private final LoanProductRepository loanProductRepository;
    private final UserRepository userRepository;
    private final LoanRepository loanRepository;
    private final CreditScoreRepository creditScoreRepository;
    private final CreditScoringService creditScoringService;
    private final RepaymentScheduleService repaymentScheduleService;
    private final LoanApplicationMapper loanApplicationMapper;

    public LoanApplicationService(
            LoanApplicationRepository loanApplicationRepository,
            LoanProductRepository loanProductRepository,
            UserRepository userRepository,
            LoanRepository loanRepository,
            CreditScoreRepository creditScoreRepository,
            CreditScoringService creditScoringService,
            RepaymentScheduleService repaymentScheduleService,
            LoanApplicationMapper loanApplicationMapper
    ) {
        this.loanApplicationRepository = loanApplicationRepository;
        this.loanProductRepository = loanProductRepository;
        this.userRepository = userRepository;
        this.loanRepository = loanRepository;
        this.creditScoreRepository = creditScoreRepository;
        this.creditScoringService = creditScoringService;
        this.repaymentScheduleService = repaymentScheduleService;
        this.loanApplicationMapper = loanApplicationMapper;
    }

    public LoanApplicationResponseDTO createApplication(LoanApplicationRequestDTO request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        LoanProduct product = loanProductRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Loan product not found"));

        if (request.getAmountRequested().compareTo(product.getMaxAmount()) > 0) {
            throw new BadRequestException("Amount exceeds maximum allowed for this product");
        }

        if (request.getTermMonths() > product.getTermMonths()) {
            throw new BadRequestException("Term exceeds maximum allowed for this product");
        }

        LoanApplication application = new LoanApplication();
        application.setUser(user);
        application.setProduct(product);
        application.setAmountRequested(request.getAmountRequested());
        application.setTermMonths(request.getTermMonths());
        application.setStatus(ApplicationStatus.PENDING);

        LoanApplication savedApplication = loanApplicationRepository.save(application);
        return loanApplicationMapper.toDTO(savedApplication);
    }

    public List<LoanApplicationResponseDTO> getMyApplications() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return loanApplicationRepository.findByUserId(user.getId()).stream()
                .map(loanApplicationMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<LoanApplicationResponseDTO> getAllApplications() {
        return loanApplicationRepository.findAll().stream()
                .map(loanApplicationMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public LoanApplicationResponseDTO approveApplication(Long id) {
        LoanApplication application = loanApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new BadRequestException("Application is not pending");
        }

        BigDecimal monthlyPayment = FinancialCalculationUtil.calculateEMI(
                application.getAmountRequested(),
                application.getProduct().getInterestRate(),
                application.getTermMonths()
        );
        var decision = creditScoringService.evaluate(application.getUser(), application, application.getProduct(), monthlyPayment);
        if (!decision.isEligible()) {
            throw new BadRequestException("Application is not eligible: " + decision.getReason());
        }

        CreditScore creditScore = new CreditScore();
        creditScore.setUser(application.getUser());
        creditScore.setScore(decision.getScore());
        creditScore.setRiskLevel(decision.getRiskLevel());
        creditScore.setCalculatedAt(java.time.LocalDateTime.now());
        creditScoreRepository.save(creditScore);

        Loan loan = new Loan();
        loan.setApplication(application);
        loan.setUser(application.getUser());
        loan.setPrincipalAmount(application.getAmountRequested());
        loan.setInterestRate(application.getProduct().getInterestRate());
        loan.setTermMonths(application.getTermMonths());
        loan.setMonthlyPayment(monthlyPayment);
        loan.setOutstandingBalance(application.getAmountRequested());
        loan.setStatus(Loan.LoanStatus.ACTIVE);
        loan.setStartDate(LocalDate.now());
        Loan savedLoan = loanRepository.save(loan);
        repaymentScheduleService.generateSchedule(savedLoan);

        application.setStatus(ApplicationStatus.APPROVED);
        LoanApplication savedApplication = loanApplicationRepository.save(application);
        return loanApplicationMapper.toDTO(savedApplication);
    }

    public LoanApplicationResponseDTO rejectApplication(Long id, String reason) {
        LoanApplication application = loanApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new BadRequestException("Application is not pending");
        }

        application.setStatus(ApplicationStatus.REJECTED);
        application.setRejectionMessage(reason);
        LoanApplication savedApplication = loanApplicationRepository.save(application);
        return loanApplicationMapper.toDTO(savedApplication);
    }
}
