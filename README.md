# 🎯 SkillSpot App

**SkillSpot** is a mobile application built using **React Native** and **Supabase**, designed to streamline the internship hiring process between students and startups.

This platform allows:

- 💼 **Startups** to post internships and view/manage student applications  
- 🎓 **Students** to explore internships, apply with custom cover letters, and track application status

---

## 🧩 Key Features

### 👨‍🎓 Student Side
- Signup & Login (email-based authentication)
- Apply for internships with a cover letter
- View applied internships with real-time status updates
- Browse all available internship listings

### 🚀 Startup Side
- Register and manage startup profile
- Post new internship opportunities
- View all student applications
- Filter applications by status and skills

---

## ⚙️ Tech Stack

- React Native (Expo)
- Supabase (Auth, Database, Realtime)
- JavaScript (ES6+)
- React Navigation

---

## 🏁 How to Run This App

### ✅ **1. Clone the Repository**

```bash
git clone https://github.com/your-username/skillspotapp.git
cd skillspotapp
```

---

### ✅ **2. Install Dependencies**

```bash
npm install
```

---

### ✅ **3. Set Up Environment**

Make sure you have a **Supabase project** created.  
Then, set up your API credentials in:

📁 `src/config/supabase.js`

```js
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://your-project-url.supabase.co',
  'your-anon-public-key'
);
```

---

### ✅ **4. Start the App**

```bash
npx expo start
```

Then scan the QR code using the **Expo Go** app on your mobile device.  
Your app will load and run on your phone instantly 🚀

---
