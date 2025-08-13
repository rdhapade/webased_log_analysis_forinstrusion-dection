

# 🛒 Amazon-Like Secure E-Commerce Platform

An **Amazon-inspired online shopping website** with advanced security, admin monitoring, malicious activity detection, and financial tracking.
Built with **React.js + Node.js + Express + MongoDB** for a **secure, scalable, and responsive** experience.

---

## 🚀 Features

### **User Features**

* 🔐 **Sign up & Login** with email verification and password hashing
* 🚫 **3 Failed Login Attempts → Account Blocked**
* 🛍️ Amazon-like **Product Catalog** with search & filtering
* 📄 **Product Details** with reviews, ratings & specifications
* 🛒 **Shopping Cart** with quantity management
* 🧾 **Order History** & profile management
* 📱 **Responsive Design** for mobile, tablet, and desktop

### **Admin Features**

* 📊 **Real-Time Graphs** for user activity & sales
* 🕵️ **Security Monitoring Panel** — detects malicious activity
* 🚫 Block/Unblock users & IPs
* 📜 **Logs & Alerts** for suspicious activities
* 💰 **Financial Panel** with expense & revenue tracking
* 📈 User analytics & behavior monitoring

### **Security Features**

* ⚠️ Automatic account blocking after 3 failed login attempts
* 🔍 Malicious activity detection & IP blocking
* 🛡️ Role-Based Access Control (RBAC)
* 📢 Real-time security alerts
* 🗄️ Activity logs stored for audit

---

## 🖥️ Tech Stack

**Frontend:**

* React.js (TypeScript)
* Tailwind CSS + Shadcn UI for premium UI
* Recharts (graphs & analytics)

**Backend:**

* Node.js + Express.js
* MongoDB (Mongoose ODM)
* JWT Authentication

**Security:**

* bcrypt.js for password hashing
* Helmet.js & CORS configuration
* Rate Limiting for login attempts

---

## 📂 Project Structure

```
src/
│── App.tsx
│── contexts/
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   ├── SecurityContext.tsx
│
│── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MainLayout.tsx
│   ├── products/
│   │   ├── ProductGrid.tsx
│   │   ├── ProductDetail.tsx
│   ├── cart/Cart.tsx
│   ├── user/UserProfile.tsx
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── SecurityPanel.tsx
│   │   ├── AnalyticsPanel.tsx
│   │   ├── FinancialPanel.tsx
│   │   ├── UserManagement.tsx
│   ├── security/SecurityAlert.tsx
│   ├── common/
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│
backend/
│── server.js
│── routes/
│── models/
│── controllers/
│── middlewares/
│
package.json
README.md
```

---

## ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/yourusername/amazon-secure-clone.git

# Go to project folder
cd amazon-secure-clone

# Install dependencies for frontend
cd frontend
npm install

# Install dependencies for backend
cd ../backend
npm install
```

---

## ▶️ Running the Project

### **Start Backend**

```bash
cd backend
npm run dev
```

### **Start Frontend**

```bash
cd frontend
npm run dev
```

Frontend runs on **[http://localhost:5173](http://localhost:5173)**
Backend runs on **[http://localhost:5000](http://localhost:5000)**

---

## 🛡️ Security Rules

* **3 Failed Login Attempts → Block Account**
* **Blocked Users** can only be unblocked by Admin
* **Suspicious Activities** are logged in the Security Panel

---


