package com.crediflow.service;

import com.crediflow.dto.LoanProductDTO;
import com.crediflow.entity.LoanProduct;
import com.crediflow.exception.ResourceNotFoundException;
import com.crediflow.mapper.LoanProductMapper;
import com.crediflow.repository.LoanProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoanProductService {
    private final LoanProductRepository loanProductRepository;
    private final LoanProductMapper loanProductMapper;

    public LoanProductService(LoanProductRepository loanProductRepository, LoanProductMapper loanProductMapper) {
        this.loanProductRepository = loanProductRepository;
        this.loanProductMapper = loanProductMapper;
    }

    public List<LoanProductDTO> getAllProducts() {
        return loanProductRepository.findAll().stream()
                .map(loanProductMapper::toDTO)
                .collect(Collectors.toList());
    }

    public LoanProductDTO getProductById(Long id) {
        LoanProduct product = loanProductRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Loan product not found with id: " + id));
        return loanProductMapper.toDTO(product);
    }

    public LoanProductDTO createProduct(LoanProductDTO productDTO) {
        LoanProduct product = loanProductMapper.toEntity(productDTO);
        LoanProduct savedProduct = loanProductRepository.save(product);
        return loanProductMapper.toDTO(savedProduct);
    }
}