💳 CrediFlow

Microservices-Based Loan Management System (Spring Boot + React)

🚀 Overview

CrediFlow is a scalable, microservices-based loan management platform designed to simulate real-world banking and fintech systems. It enables customers to apply for loans, undergo credit evaluation, receive approvals, and manage repayments — all through a modern, distributed architecture.

This project demonstrates enterprise-grade backend design, financial domain modeling, and secure API development, making it ideal for fintech and banking environments.

🧠 Key Features
👤 Customer Management
User registration & authentication (JWT-based)
Customer profile management
Role-based access control (Admin / Customer)
💼 Loan Management
Loan product configuration (interest rates, limits, terms)
Loan application submission
Loan approval/rejection workflow
Loan lifecycle tracking (Active, Closed, Defaulted)
🧠 Credit Scoring Engine
Rule-based credit scoring system
Risk classification (Low, Medium, High)
Credit score simulation based on:
Income
Employment status
Loan amount
📊 Repayment System
Automated EMI calculation
Repayment schedule generation
Payment tracking
Late payment penalties
💸 Financial Logic
Interest calculations (amortization)
Monthly installment (EMI) computation
Outstanding balance tracking
🏗️ Architecture

CrediFlow follows a microservices architecture with clear separation of concerns:

                ┌──────────────────────┐
                │     React Frontend   │
                └─────────┬────────────┘
                          │ REST APIs
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Identity Svc │  │ Loan Svc     │  │ Credit Svc   │
└──────────────┘  └──────────────┘  └──────────────┘
                          │
                          ▼
                  ┌──────────────┐
                  │ Payment Svc  │
                  └──────────────┘
🧩 Microservices
1️⃣ Identity Service
User authentication & authorization
JWT token generation
Manages users and profiles
2️⃣ Loan Service
Loan applications
Loan products
Loan approval logic
Loan lifecycle
3️⃣ Credit Service
Credit score calculation
Risk evaluation engine
4️⃣ Payment Service
Repayment schedules
Payment processing
Penalty management
🗄️ Database Design

The system uses a relational database (PostgreSQL) with core entities:

Users & Customer Profiles
Loan Applications & Loans
Credit Scores
Repayment Schedules
Payments & Penalties

Supports:

Strong data integrity (FK constraints)
Financial accuracy
Audit-ready structure
⚙️ Tech Stack
🖥️ Backend
Java 17+
Spring Boot
Spring Security (JWT)
Spring Data JPA / Hibernate
PostgreSQL
🌐 Frontend
React (Vite)
TypeScript
Tailwind CSS
🐳 DevOps
Docker & Docker Compose
REST APIs (Postman/Swagger)
🔐 Security
JWT-based authentication
Role-based access control (RBAC)
Secure password hashing (BCrypt)
Input validation & error handling
📈 Financial Calculations

CrediFlow implements real-world banking formulas:

EMI Formula
EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1]

Where:

P = Principal loan amount
r = Monthly interest rate
n = Loan term in months
📦 Getting Started
🔧 Prerequisites
Java 17+
Node.js 18+
Docker
🐳 Run with Docker
docker-compose up --build
▶️ Run Services Individually
# Example: Loan Service
cd loan-service
./mvnw spring-boot:run
💻 Run Frontend
cd frontend
npm install
npm run dev
📬 API Documentation
Swagger UI available per service:
http://localhost:{port}/swagger-ui.html
🎯 Use Cases
Digital lending platforms
Banking systems modernization
Fintech product prototyping
Credit risk simulation tools
🧪 Future Enhancements
🔄 Event-driven communication (Kafka)
🤖 Workflow engine (Camunda)
📊 Admin analytics dashboard
📄 PDF loan statements
☁️ Cloud deployment (AWS / Azure)
👨‍💻 Author

Mbongeni Mhlanga
Software Engineer | Java, Spring Boot, React
Passionate about building scalable fintech systems