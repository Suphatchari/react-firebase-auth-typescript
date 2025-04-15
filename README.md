# 🦐 Shrimp Farm Web

A modern web application for shrimp farm management using **React**, **TypeScript**, **Firebase Authentication**, **Firestore**, and **Vite**.

This project includes:
- 🔐 Login & Register with Firebase Auth
- ☁️ User profile storage in Firestore
- ✅ Form validation with Formik + Yup
- 💬 Toast notifications via react-toastify
- 🔒 Protected Routes with context-based auth
- ⚡ Fast dev experience with Vite + HMR

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/shrimp-farm-web.git
cd shrimp-farm-web
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the dev server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

---

## 🔧 Project Structure

```
src/
├── auth/                    # Route guards (e.g., ProtectedRoute)
├── components/              # Main UI pages (Home, Login, Register)
│   └── forms/               # Formik + Yup forms (LoginForm, RegisterForm)
├── context/                 # Firebase auth context (UserAuthContext)
├── firebase.ts              # Firebase SDK init
├── App.tsx / main.tsx       # Entry point
```

---

## 🔐 Firebase Setup

Ensure you’ve set up a Firebase project and updated your credentials in `src/firebase.ts`. You should enable:

- **Authentication** → Email/Password
- **Firestore Database** → In test mode (or with rules)
- **(Optional)** Storage / Hosting if needed

---

## ✅ Linting & Formatting

This project includes ESLint with TypeScript support. You can extend rules by modifying `eslint.config.js`.

```bash
npm run lint
```

---

## 📦 Tech Stack

| Tech             | Used For                         |
|------------------|----------------------------------|
| React + Vite     | Frontend framework + dev server  |
| TypeScript       | Type safety                      |
| Firebase Auth    | Authentication                   |
| Firestore        | Cloud database                   |
| React-Bootstrap  | UI Components                    |
| Formik + Yup     | Form handling + validation       |
| React Toastify   | Toast notification system        |
---
