package com.crediflow.controller;

import com.crediflow.dto.LoanProductDTO;
import com.crediflow.service.LoanProductService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class LoanProductController {
    private final LoanProductService loanProductService;

    public LoanProductController(LoanProductService loanProductService) {
        this.loanProductService = loanProductService;
    }

    @GetMapping
    public ResponseEntity<List<LoanProductDTO>> getAllProducts() {
        return ResponseEntity.ok(loanProductService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(loanProductService.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<LoanProductDTO> createProduct(@Valid @RequestBody LoanProductDTO productDTO) {
        return ResponseEntity.ok(loanProductService.createProduct(productDTO));
    }
}