# 🛒 Ecommerce Application - Spring Boot & React

This is a full-stack **Ecommerce Web Application** built using **Spring Boot (Java)** for the backend and **React.js** for the frontend. It includes user registration, product browsing, cart operations,  payment processing, and order tracking.

---

## 📁 Project Structure

Ecommers-Springboot-React/
├── Frontend-React/ # React Frontend
│ ├── src/
│ └── public/
│
├── userservice/ # User Service (Sign Up & Login)
├── Products-service/ # Product Management Service
├── orders/ # Order Management Service
├── payments/ # Payment Service
└── README.md


---

## ⚙️ Tech Stack

### 🧩 Frontend
- React.js
- Axios
- Bootstrap
- React Router DOM

### 🔧 Backend (Spring Boot)
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 / MySQL
- Maven

---

## 🚀 Features

- ✅ User Sign Up & Login
- ✅ Product Listing
- ✅ Add to Cart / Remove from Cart
- ✅ Quantity Increment / Decrement in Cart
- ✅ Checkout & Payment
- ✅ Order History Page

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sathvik5088/Ecommerce-Springboot-React.git
cd Ecommerce-Springboot-React
cd userservice
./mvnw spring-boot:run

cd ../Products-service
./mvnw spring-boot:run

cd ../orders
./mvnw spring-boot:run

cd ../payments
./mvnw spring-boot:run

cd ../Frontend-React
npm install
npm start


