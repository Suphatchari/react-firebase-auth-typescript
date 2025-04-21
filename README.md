# 🦐 Shrimp Farm Web

A modern web application for shrimp farm management built as part of the **Shrimp Farm Management Platform – MVP**.  
The system empowers farm owners and employees to manage shrimp farming activities with digital tools, data visibility, and access control.

---

## ✨ Features

- 🔐 Login & Register with Firebase Auth  
- ☁️ User profile storage in Firestore  
- ✉️ Duplicate email validation before registration  
- ✅ Form validation with Formik + Yup  
- 💬 Toast notifications via React Toastify (with custom Thai/Eng font)  
- 🔒 Protected Routes via context-based auth  
- ⚡ Vite + TypeScript for blazing-fast dev experience  
- 🎨 Global font setup with **Noto Sans Thai** + **Noto Sans**  
- 🚫 Animated Page Not Found  
- 📦 Environment-based config with `.env` support  
- 🌐 REST API consumption via Axios (with baseURL config)  

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

### 3. Create `.env` file
Create a `.env` file at the root with the following content:
```env
VITE_API_BASE_URL=https://todo-list-api-mfchjooefq-as.a.run.app/todo-list
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> 🔐 Never commit your `.env` file

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔧 Project Structure

```
📁 src/
├── assets/           # Static assets (logos, etc.)
├── auth/             # Auth guards
├── components/       # UI components     
├── config/           # Global config
├── context/          # Global context
├── css/              # Standalone CSS files
├── helpers/          # Reusable utility functions
├── pages/            # Main page views
├── router/           # AppRouter config for react-router
├── services/         # API calls
├── App.css           # App component styles
├── App.tsx           # App entry component
├── firebase.ts       # Firebase initialization
├── index.css         # Global styles & font setup
├── main.tsx          # Vite main bootstrap
└── types.d.ts        # Type declarations
```

---

## 🔐 Firebase Setup

Make sure you’ve initialized a Firebase project and updated your credentials in `src/firebase.ts`.

Enable these features:
- ✅ Authentication → Email/Password  
- ✅ Firestore Database (test mode or secure rules)  
- ✅ [Email Enumeration Protection](https://firebase.google.com/docs/auth/admin/email-enumeration-protection) → enabled (recommended)

---

## ✅ Linting & Formatting

Use ESLint to analyze and enforce code style:

```bash
npm run lint
```

You can customize rules via `eslint.config.js`.

---

## 📦 Tech Stack

| Tech               | Used For                         |
|--------------------|----------------------------------|
| React + Vite       | Frontend framework + dev server  |
| TypeScript         | Type safety                      |
| Firebase Auth      | Authentication                   |
| Firestore          | Cloud database                   |
| React-Bootstrap    | UI Components                    |
| Formik + Yup       | Form handling + validation       |
| React Toastify     | Toast notification system        |
| React Icons        | Icon system                      |
| Axios              | HTTP requests to external APIs   |
| Vite Env Vars      | .env config for API base URL     |
| Path Aliases       | Simplified imports using @/...   |
| Noto Sans          | Global font styling              |
---

## 📁 License

This project is part of a private MVP initiative and not yet publicly licensed.

---