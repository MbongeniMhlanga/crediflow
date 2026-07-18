package com.crediflow.service;

import com.crediflow.dto.UserDTO;
import com.crediflow.dto.UserProfileUpdateRequest;
import com.crediflow.entity.User;
import com.crediflow.exception.ResourceNotFoundException;
import com.crediflow.mapper.UserMapper;
import com.crediflow.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserDTO getCurrentUser() {
        return userMapper.toDTO(currentUser());
    }

    public UserDTO updateCurrentUserProfile(UserProfileUpdateRequest request) {
        User user = currentUser();
        user.setMonthlyIncome(request.getMonthlyIncome());
        user.setEmploymentStatus(request.getEmploymentStatus());
        return userMapper.toDTO(userRepository.save(user));
    }

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
