package com.crediflow.mapper;

import com.crediflow.dto.LoanProductDTO;
import com.crediflow.entity.LoanProduct;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface LoanProductMapper {
    LoanProductMapper INSTANCE = Mappers.getMapper(LoanProductMapper.class);

    LoanProductDTO toDTO(LoanProduct loanProduct);

    LoanProduct toEntity(LoanProductDTO loanProductDTO);
}