package com.crediflow.repository;

import com.crediflow.entity.LoanProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanProductRepository extends JpaRepository<LoanProduct, Long> {
}