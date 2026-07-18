package com.crediflow.controller;

import com.crediflow.dto.PaymentCreateRequest;
import com.crediflow.dto.PaymentDTO;
import com.crediflow.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/loan/{loanId}")
    public ResponseEntity<List<PaymentDTO>> getByLoan(@PathVariable Long loanId) {
        return ResponseEntity.ok(paymentService.getPaymentsByLoanId(loanId));
    }

    @PostMapping
    public ResponseEntity<PaymentDTO> create(@Valid @RequestBody PaymentCreateRequest request) {
        return ResponseEntity.ok(paymentService.createPayment(request));
    }
}
