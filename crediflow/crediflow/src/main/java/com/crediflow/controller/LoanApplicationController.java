package com.crediflow.controller;

import com.crediflow.dto.LoanApplicationRequestDTO;
import com.crediflow.dto.LoanApplicationResponseDTO;
import com.crediflow.service.LoanApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
public class LoanApplicationController {
    private final LoanApplicationService loanApplicationService;

    public LoanApplicationController(LoanApplicationService loanApplicationService) {
        this.loanApplicationService = loanApplicationService;
    }

    @PostMapping
    public ResponseEntity<LoanApplicationResponseDTO> createApplication(@Valid @RequestBody LoanApplicationRequestDTO request) {
        return ResponseEntity.ok(loanApplicationService.createApplication(request));
    }

    @GetMapping("/my")
    public ResponseEntity<List<LoanApplicationResponseDTO>> getMyApplications() {
        return ResponseEntity.ok(loanApplicationService.getMyApplications());
    }

    @GetMapping
    public ResponseEntity<List<LoanApplicationResponseDTO>> getAllApplications() {
        return ResponseEntity.ok(loanApplicationService.getAllApplications());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<LoanApplicationResponseDTO> approveApplication(@PathVariable Long id) {
        return ResponseEntity.ok(loanApplicationService.approveApplication(id));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<LoanApplicationResponseDTO> rejectApplication(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String reason = request.getOrDefault("reason", "Rejected");
        return ResponseEntity.ok(loanApplicationService.rejectApplication(id, reason));
    }
}