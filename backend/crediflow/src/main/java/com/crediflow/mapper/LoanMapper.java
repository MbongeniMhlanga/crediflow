package com.crediflow.mapper;

import com.crediflow.dto.LoanDTO;
import com.crediflow.entity.Loan;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface LoanMapper {
    LoanMapper INSTANCE = Mappers.getMapper(LoanMapper.class);

    @Mapping(source = "application.id", target = "applicationId")
    @Mapping(source = "user.id", target = "userId")
    LoanDTO toDTO(Loan loan);
}