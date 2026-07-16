package com.crediflow.service;
import com.crediflow.dto.AuthResponse;
import com.crediflow.dto.LoginRequest;
import com.crediflow.dto.RegisterRequest;
import com.crediflow.dto.UserDTO;
import com.crediflow.entity.Role;
import com.crediflow.entity.User;
import com.crediflow.exception.BadRequestException;
import com.crediflow.mapper.UserMapper;
import com.crediflow.repository.RoleRepository;
import com.crediflow.repository.UserRepository;
import com.crediflow.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    public AuthenticationService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            UserMapper userMapper
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userMapper = userMapper;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email already exists");
        }

        // Get or create USER role
        Role userRole = roleRepository.findByRoleName("USER")
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setRoleName("USER");
                    return roleRepository.save(newRole);
                });

        Set<Role> roles = new HashSet<>();
        roles.add(userRole);

        User user = new User();
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRoles(roles);

        User savedUser = userRepository.save(user);
        String jwtToken = jwtService.generateToken(
                new org.springframework.security.core.userdetails.User(
                        savedUser.getEmail(),
                        savedUser.getPasswordHash(),
                        new java.util.ArrayList<>()
                )
        );

        UserDTO userDTO = userMapper.toDTO(savedUser);
        return new AuthResponse(jwtToken, "Bearer", userDTO);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));

        String jwtToken = jwtService.generateToken(
                new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPasswordHash(),
                        new java.util.ArrayList<>()
                )
        );

        UserDTO userDTO = userMapper.toDTO(user);
        return new AuthResponse(jwtToken, "Bearer", userDTO);
    }
}