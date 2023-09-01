# School/College User Management System

This project is a Django and Django Rest Framework JWT authentication system with a Custom User Model for managing multiple user types, including admin, supervisors, and students. It is designed for schools or colleges looking to develop a system that can manage different user profiles efficiently.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Endpoints](#endpoints)
- [How JWT Works](#how-jwt-works)
- [Custom User Model](#custom-user-model)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Description

This system is built using Django and Django Rest Framework for the backend, and React.js with Redux for the frontend. It provides JWT authentication and user management capabilities for colleges or schools that need to handle multiple user types (admin, supervisors, students) with their respective profiles.

## Installation

1. Clone the repository:

```sh
git clone [[repository-url]](https://github.com/Nawaf-Code/Graduation-Projects-Management-System.git)https://github.com/Nawaf-Code/Graduation-Projects-Management-System.git
   ```
2. Navigate to the project folder:

```sh
cd [project-folder]
```

3. Navigate to the project folder:

```sh
pip install -r requirements.txt
```

## Endpoints
### JWT Authentication

Endpoint to create JWT token:

```sh
POST /auth/jwt/create/
```
Example Request:
```sh
{
    "username": "your_username",
    "password": "your_password"
}
```
Example Response:
```sh
{
    "token": "your_access_token"
}
```
### User Registration
Endpoint to register a new user:

```sh
POST /register/
```
Example Request for Student Registration:
```sh
{
    "username": "your_username",
    "first_name": "your_first_name",
    "last_name": "your_last_name",
    "email": "your_email@example.com",
    "password": "your_password",
    "re_password": "your_password",
    "role": "STUDENT",
    "student_profile": {
        "Status": true,
        "Is_Leader": false,
        "Major": "CS",
        "Gender": "MALE"
    }
}
```
### Check Email Availability
Endpoint to check if an email is available:
```sh
POST /check_email/
```
Example Request:
```sh
{
    "email": "your_email@example.com"
}
```
Example Response:
```sh
{
    "email_exists": false
}

```
## How JWT Works
