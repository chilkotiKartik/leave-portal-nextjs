<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:0F172A,50:1E293B,100:0F172A&text=Leave%20Approval%20%26%20HR%20Flow%20Portal&fontColor=FFFFFF&fontSize=36&fontAlignY=40&desc=Next.js%20%20TypeScript%20%20Tailwind%20CSS%20%20Shadcn%20UI%20%20Zod%20Validation&descColor=94A3B8&descFontSize=15&descAlignY=62" width="100%" alt="Leave Approval & HR Flow Portal" />

<br />

[![GitHub stars](https://img.shields.io/github/stars/chilkotiKartik/=for-the-badge&logo=github&color=1E293B)](https://github.com/chilkotiKartik/leave-portal-nextjs/stargazers)
[![License](https://img.shields.io/badge/License-MIT-0284c7?style=for-the-badge)](LICENSE)
[![Maintained](https://img.shields.io/badge/Maintained%3F-yes-10b981?style=for-the-badge)](https://github.com/chilkotiKartik/leave-portal-nextjs)
[![Author](https://img.shields.io/badge/Author-Kartik%20Chilkoti-6366f1?style=for-the-badge)](https://github.com/chilkotiKartik)

</div>

---

## 📌 Project Overview

An internal HR platform engineered for seamless employee leave requests, multi-tier management approvals, balance auditing, and departmental calendar synchronization.

---

## 🚀 Key Features

- **Multi-Tier Approval Hierarchy:** Automated routing of requests from team members to direct managers and HR leads.
- **Leave Balance Ledger:** Live accounting of sick, casual, earned, and bereavement leave balances.
- **Interactive Calendar View:** Departmental heatmaps to prevent team understaffing during peak holidays.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Application Layer** | Next.js, React, TypeScript |
| **UI Design System** | Tailwind CSS, Shadcn UI / Radix Primitives |
| **State & Forms** | React Hook Form, Zod, Custom Hooks |

---

## 📂 Repository Structure

`	ext
leave-portal-nextjs/
??? app/                    # Leave request forms & approval dashboards
??? components/             # Status badges, request tables, date pickers
??? hooks/                  # Custom data fetching & auth hooks
??? lib/                    # Validation schemas & calculation utilities
`

---

## ⚙️ Environment Configuration

Create a .env.local or .env file in the root directory:

`nv
NEXT_PUBLIC_COMPANY_DOMAIN=yourdomain.com
DATABASE_URL=your_db_connection
`

---

## 🚦 Getting Started

### 1. Clone the Repository
`ash
git clone https://github.com/chilkotiKartik/leave-portal-nextjs.git
cd leave-portal-nextjs
`

### 2. Install Dependencies
`ash
npm install
`

### 3. Run Development Server
`ash
npm run dev
`

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 👤 Author

**Kartik Chilkoti**
- **GitHub:** [@chilkotiKartik](https://github.com/chilkotiKartik)
- **Email:** [chilkotikartik@gmail.com](mailto:chilkotikartik@gmail.com)

---

<div align="center">
<sub>Engineered with precision by <strong>Kartik Chilkoti</strong> &bull; All rights reserved.</sub>
</div>