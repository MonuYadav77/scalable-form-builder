# Scalable Form Builder API

##1. Project Overview

The Scalable Form Builder API is a backend system that allows admins to create dynamic forms and users to submit responses at scale.
The project is designed to demonstrate real-world backend engineering skills including security, scalability, performance optimization, and system design.

---

## 2. Problem Statement

Traditional CRUD applications do not demonstrate how systems behave under high write traffic, dynamic schemas, or real-world constraints.

This project solves:

* Dynamic form creation (schema changes at runtime)
* High-volume form submissions
* Secure, role-based access
* Performance optimization using caching and indexing
* Scalable architecture using queues and microservices

---

## 3. Core Features

### Authentication & Authorization

* JWT-based authentication
* Role-Based Access Control (RBAC)
* Roles:

  * ADMIN: Create & manage forms
  * USER: Submit responses

### Dynamic Form Builder

* Forms are defined using JSON schemas
* Each form contains multiple dynamic fields
* No hardcoded database schema for responses

### Form Submission System

* Users submit responses against a form
* Responses are validated dynamically against form schema
* High-throughput write handling

### Performance & Scalability

* Redis caching for form schemas
* MongoDB indexing for fast queries
* Asynchronous submission processing using queue

### Production-Ready Features

* Centralized logging
* Rate limiting to prevent abuse
* Dockerized services
* CI/CD workflow

---

## 4. Tech Stack

| Layer    | Technology             |
| -------- | ---------------------- |
| Backend  | Node.js, Express       |
| Database | MongoDB                |
| Cache    | Redis                  |
| Auth     | JWT, bcrypt            |
| Queue    | Kafka or BullMQ        |
| Logging  | Winston, Morgan        |
| Security | Rate Limiting  |
| DevOps   | Docker, GitHub Actions |

---

## 5. High-Level Architecture

The system is divided into loosely coupled services to support scalability and fault isolation.

### Services

1. **Auth & Form API Service**

   * Authentication
   * RBAC
   * Form CRUD
   * Redis caching

2. **Submission Service**

   * Accepts form submissions
   * Performs validation
   * Publishes events to queue

3. **Worker Service**

   * Consumes submission events
   * Writes responses to database
   * Handles retries & failures

---

## 6. System Flow (End-to-End)

### Form Creation Flow

1. Admin logs in
2. Admin creates a form with JSON schema
3. Form schema is stored in MongoDB
4. Form schema is cached in Redis

### Form Fetch Flow

1. Client requests form
2. API checks Redis cache
3. If cache miss → fetch from MongoDB → update Redis
4. Return form schema

### Form Submission Flow

1. User submits form response
2. API validates response against schema
3. Valid response pushed to queue
4. Worker consumes message
5. Response stored in MongoDB

---

## 7. Architecture Diagram (Text)

```
Client (Web / Mobile)
        |
        | JWT Auth
        v
API Gateway / Form API
        |
        | RBAC + Rate Limit
        |
        |---- Redis (Form Cache)
        |
        |---- MongoDB (Forms)
        |
        |---- Queue (Kafka / BullMQ)
                     |
                     v
              Worker Service
                     |
                     v
              MongoDB (Responses)
```

---

## 8. Database Design

### Form Collection

* _id
* title
* fields (array of dynamic field definitions)
* createdBy
* createdAt

### Response Collection

* _id
* formId (indexed)
* userId (indexed)
* answers (JSON)
* createdAt (indexed)

---

## 9. Indexing Strategy

* Index on `formId` for fast response lookup
* Index on `createdAt` for analytics & pagination
* Index on `userId` for user-based queries

---

## 10. Security Considerations

* JWT with short expiry
* RBAC middleware on protected routes
* Rate limiting on submission APIs
* Input validation & sanitization

---

## 11. Deployment Strategy

* Each service runs in its own Docker container
* Docker Compose for local development
* CI/CD pipeline:

  1. Code push
  2. Run checks
  3. Build Docker image
  4. Deploy

