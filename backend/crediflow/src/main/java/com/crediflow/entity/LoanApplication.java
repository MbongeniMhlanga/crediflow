package com.crediflow.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "LOAN_APPLICATIONS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private LoanProduct product;
    
    @Column(name = "amount_requested", nullable = false, precision = 15, scale = 2)
    private BigDecimal amountRequested;
    
    @Column(name = "term_months", nullable = false)
    private Integer termMonths;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ApplicationStatus status;
    
    @Column(name = "rejection_message")
    private String rejectionMessage;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    public enum ApplicationStatus {
        PENDING, APPROVED, REJECTED
    }
}