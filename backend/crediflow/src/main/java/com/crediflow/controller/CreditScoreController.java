package com.crediflow.controller;

import com.crediflow.dto.CreditDecisionDTO;
import com.crediflow.dto.CreditScoreDTO;
import com.crediflow.service.CreditScoreQueryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/credit-scores")
public class CreditScoreController {
    private final CreditScoreQueryService creditScoreQueryService;

    public CreditScoreController(CreditScoreQueryService creditScoreQueryService) {
        this.creditScoreQueryService = creditScoreQueryService;
    }

    @GetMapping("/me")
    public ResponseEntity<CreditScoreDTO> myLatestScore() {
        return ResponseEntity.ok(creditScoreQueryService.getCurrentUserLatestScore());
    }

    @GetMapping("/decision")
    public ResponseEntity<CreditDecisionDTO> latestDecision() {
        return ResponseEntity.ok(creditScoreQueryService.getCurrentUserDecision());
    }
}
