package com.crediflow.controller;

import com.crediflow.dto.RepaymentScheduleDTO;
import com.crediflow.service.RepaymentScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/repayment-schedules")
public class RepaymentScheduleController {
    private final RepaymentScheduleService repaymentScheduleService;

    public RepaymentScheduleController(RepaymentScheduleService repaymentScheduleService) {
        this.repaymentScheduleService = repaymentScheduleService;
    }

    @GetMapping("/loan/{loanId}")
    public ResponseEntity<List<RepaymentScheduleDTO>> getByLoan(@PathVariable Long loanId) {
        return ResponseEntity.ok(repaymentScheduleService.getScheduleByLoanId(loanId));
    }
}
