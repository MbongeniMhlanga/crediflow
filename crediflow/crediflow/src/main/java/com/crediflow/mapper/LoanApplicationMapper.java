package com.crediflow.mapper;

import com.crediflow.dto.LoanApplicationResponseDTO;
import com.crediflow.entity.LoanApplication;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface LoanApplicationMapper {
    LoanApplicationMapper INSTANCE = Mappers.getMapper(LoanApplicationMapper.class);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    LoanApplicationResponseDTO toDTO(LoanApplication loanApplication);
}