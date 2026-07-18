package com.crediflow.service;

import com.crediflow.dto.CreditDecisionDTO;
import com.crediflow.dto.CreditScoreDTO;
import com.crediflow.entity.CreditScore;
import com.crediflow.entity.LoanApplication;
import com.crediflow.entity.Loan;
import com.crediflow.entity.User;
import com.crediflow.exception.ResourceNotFoundException;
import com.crediflow.repository.CreditScoreRepository;
import com.crediflow.repository.LoanApplicationRepository;
import com.crediflow.repository.LoanRepository;
import com.crediflow.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CreditScoreQueryService {
    private final CreditScoreRepository creditScoreRepository;
    private final LoanApplicationRepository loanApplicationRepository;
    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final CreditScoringService creditScoringService;

    public CreditScoreQueryService(
            CreditScoreRepository creditScoreRepository,
            LoanApplicationRepository loanApplicationRepository,
            LoanRepository loanRepository,
            UserRepository userRepository,
            CreditScoringService creditScoringService
    ) {
        this.creditScoreRepository = creditScoreRepository;
        this.loanApplicationRepository = loanApplicationRepository;
        this.loanRepository = loanRepository;
        this.userRepository = userRepository;
        this.creditScoringService = creditScoringService;
    }

    public CreditScoreDTO getCurrentUserLatestScore() {
        User user = currentUser();
        CreditScore score = creditScoreRepository.findTopByUserIdOrderByCalculatedAtDesc(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("No credit score found for current user"));
        return new CreditScoreDTO(score.getId(), user.getId(), score.getScore(), score.getRiskLevel(), score.getCalculatedAt());
    }

    public CreditDecisionDTO getCurrentUserDecision() {
        User user = currentUser();
        LoanApplication application = loanApplicationRepository.findByUserId(user.getId())
                .stream()
                .reduce((first, second) -> second)
                .orElseThrow(() -> new ResourceNotFoundException("No loan application found for current user"));

        Loan loan = loanRepository.findByUserId(user.getId())
                .stream()
                .reduce((first, second) -> second)
                .orElseThrow(() -> new ResourceNotFoundException("No loan found for current user"));

        return creditScoringService.evaluate(user, application, application.getProduct(), loan.getMonthlyPayment());
    }

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
