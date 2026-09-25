# WA Commerce AI — AI E-Commerce Agent

> A premium AI-powered e-commerce management platform designed for WhatsApp-based customer conversations, product management, order management, AI assistance, customer CRM, bargaining workflows, voice interactions, and WhatsApp Business integration.

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3)
![Status](https://img.shields.io/badge/Status-Frontend_Prototype-success?style=for-the-badge)

---

## 📌 Project Overview

**WA Commerce AI** is a professional, client-ready administrative SaaS dashboard tailored for AI-driven e-commerce via WhatsApp. It solves the fragmentation of managing e-commerce inventory, customer inquiries, and AI configuration by centralizing everything into a single, cohesive interface.

Designed for e-commerce administrators and business owners, this platform allows users to:
- Manage products, stock, and orders.
- Provide highly responsive AI automated support to customers over WhatsApp.
- Configure AI behaviors, such as bargaining limits and response styles.
- Manage customer CRM and view historical activity.

**How the AI Agent Fits In:** The AI agent acts as a first-line responder on WhatsApp, handling inquiries, providing dynamic voice responses, and even negotiating product prices within pre-approved boundaries configured in this dashboard. 

---

## ✨ Key Features

### 📊 Dashboard
- **KPI Overview:** Real-time mock metrics for sales, active conversations, and interactions.
- **Sales Overview:** Data visualization using Recharts.
- **Recent Activity:** Quick glance at recent orders, AI activity, and WhatsApp connection status.

### 📦 Product Management
- **Product Listing:** View all products with stock indicators and status badges.
- **Search, Filter & Sort:** Fast client-side filtering by category, status, and stock levels.
- **Add/Edit Product:** Comprehensive modal form with validation.
- **Product Details:** Deep dive into product metadata, images, and configuration.
- **Product Bargaining Configuration:** Define maximum discount percentages, minimum selling prices, and negotiation attempts per product.

### 🛍️ Order Management
- **Order Listing:** Filterable and searchable table of all orders.
- **Order Details:** Interactive order timeline.
- **Status Management:** Track payment status and order progression.
- **Printable Order Slip:** Exportable/printable professional order invoices.
- **Order Cancellation:** Safe workflows for canceling orders and handling refunds.

### 👥 Customer CRM
- **Customer Listing:** Database of all customer interactions.
- **Customer Profiles:** Detailed view including order history and activity timeline.
- **Search & Filtering:** Quickly locate customers by name, phone number, or status.

### 💬 Conversations & WhatsApp Integration
- **WhatsApp-Inspired Chat UI:** Familiar dual-pane messaging interface.
- **Conversation List:** Filter by AI-handled vs Human-handled chats.
- **Active Chat:** Real-time mock chat interface with customer context panel.
- **AI Indicators:** Visual cues distinguishing AI messages from human agent messages.
- **Message Composer:** Supports text and voice interactions.

### 🤖 AI Agent Control Center
- **System Prompt Management:** Adjust the AI's core persona and behavior.
- **AI Settings & Capabilities:** Toggle global features like bargaining or voice generation.
- **Response Style:** Configure the AI's tone (professional, friendly, concise).
- **Test Console:** Built-in chat interface to test the mock AI responses and voice interactions before deploying to WhatsApp.

### 🤝 Bargaining & Negotiation (AI)
- **Product-Level Configuration:** Enable/disable negotiation per product.
- **Negotiation Boundaries:** Set absolute minimum selling prices to prevent the AI from offering unprofitable deals.
- **Mock AI Final Offer UI:** Interface to review how the AI negotiated with customers in the chat logs.

### 🎙️ Voice Support
- **Voice Recording Interaction:** UI for recording voice messages directly from the dashboard.
- **Mock Transcript Rendering:** Simulates Speech-to-Text conversion for inbound voice notes.
- **Audio Playback UI:** Interactive audio player for reviewing customer voice queries.

### ⚙️ Settings & WhatsApp Business
- **Connection Overview:** Dashboard displaying Meta/WhatsApp Cloud API health.
- **Webhook Configuration:** Interface for verifying payload delivery.
- **Security / Credential UX:** Masked sensitive fields (API tokens, Phone Number IDs) with show/hide toggles. *(Note: These are mock credential interfaces for demonstration only).*

---

## 🏗️ Important Architecture Note

**This project is currently a Frontend-Only UI Prototype.**

It is built with **React**, **Vite**, and **Client-Side Routing** (React Router). To facilitate a realistic demonstration without relying on live backend services, this project heavily relies on a **Mock API/Service Layer** (`mockApiService.js`) and **Local Frontend State** populated with realistic mock data (`src/data/`).

**Currently, there is NO:**
- Production Backend or Database
- Live WhatsApp Cloud API Integration
- Live Meta API Integration
- Live Gemini / LLM API calls
- Real Authentication or Secure Credential Storage
- Real Speech-to-Text / Text-to-Speech

**Architecture Philosophy:** The frontend is strictly decoupled. The `mockApiService.js` acts as an adapter. The future backend engineering team can simply replace the asynchronous calls in the service layer with real `fetch()` or `axios` requests to their APIs without needing to rewrite or restructure the React UI.

---

## 💻 Technology Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** Vanilla CSS (Custom Design System)
- **Icons:** Lucide React
- **Charts:** Recharts
- **Language:** JavaScript (ES6+ / JSX)

---

## 📂 Project Architecture

```text
WA-Commerce-AI/
│
├── frontend/
│   ├── src/
│   │   ├── assets/           # Static media and fonts
│   │   ├── components/       # Reusable UI modules (Tables, Modals, Forms)
│   │   ├── data/             # Realistic mock data and initial states
│   │   ├── layouts/          # Global application shells (Sidebar, Header)
│   │   ├── pages/            # Top-level route components
│   │   ├── services/         # mockApiService.js (The API Adapter layer)
│   │   ├── App.css           # Global generic styles
│   │   ├── App.jsx           # Router configuration
│   │   ├── index.css         # Core Design System, Variables, Utility classes
│   │   └── main.jsx          # React entry point
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/              # Repository of UI snapshots
└── README.md
```

---

## 🛣️ Application Routes

- `/dashboard` — Main KPI overview
- `/products` — Product management listing
- `/products/:id` — Detailed product view & configuration
- `/orders` — Order management listing
- `/orders/:id` — Order timeline and printable slip
- `/customers` — CRM customer listing
- `/customers/:id` — Detailed customer profile
- `/conversations` — WhatsApp-style messaging interface
- `/ai-agent` — AI behavior and prompt configuration
- `/whatsapp` — Meta API connection and webhook status
- `/settings` — Global platform settings

---

## 🎨 UI / UX Design System

The application relies on a premium, bespoke design system prioritizing modern SaaS aesthetics:
- **Color Palette:** Deep navy sidebars, clean white workspace cards, and vibrant primary blue/purple accents to signify AI interactions.
- **WhatsApp Integration:** Distinct, controlled WhatsApp green accents used only where relevant (Conversations, WhatsApp Settings).
- **Interactive UX:** Smooth hover states, custom scrollbars, and micro-animations for modal dialogs and toast notifications.
- **Feedback:** Comprehensive use of Status Badges and Toast Notifications for user actions.

### 📱 Responsive Design
The CSS is designed to gracefully adapt across standard viewports:
- **Desktop/Laptop:** Expanded sidebar, full data tables, dual-pane chat.
- **Tablet/Mobile:** Collapsible sidebar (hamburger menu), stacked cards, horizontally scrollable data tables.

---

## 🚀 Installation & Running

To run this prototype locally on your machine:

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. To build the project for production deployment:
   ```bash
   npm run build
   ```

---

## 🔍 Demo Workflow (How to Explore)

1. **Dashboard:** Start here to see the high-level metrics.
2. **Products:** Click "Add Product" to test form validation, or open an existing product. Scroll to the "Bargaining & Negotiation" section to see the AI pricing constraints.
3. **Conversations:** Open the chat interface. Try sending a text message or interacting with the **Voice Recording UI**. Notice how the mock AI responds based on its configured prompt.
4. **AI Agent:** Navigate to the AI Agent Control Center. Try toggling features on/off or testing the prompt in the built-in test console.
5. **WhatsApp:** Check out the connection flow and webhook verification UI, designed to look identical to a real Meta Developer configuration portal.

---

## 🔮 Future Backend Integration

This UI is ready to be wired up to a production backend. The future roadmap includes integrating:
- **Database:** PostgreSQL or MongoDB to replace `src/data/`.
- **AI Core:** Google Gemini or OpenAI for dynamic conversational capabilities and bargaining logic.
- **Messaging:** Meta WhatsApp Cloud API for receiving and sending actual WhatsApp messages.
- **Audio Processing:** Real-time Speech-to-Text and Text-to-Speech APIs for voice interactions.
- **Authentication:** JWT/OAuth to secure the dashboard and manage user roles.

---

## 📸 Screenshots

Here is a glimpse of the professional interfaces included in this project. *(Refer to the `/screenshots` directory for all full-resolution UI captures).*

### Dashboard

![Dashboard](./screenshots/Screenshot%20%28204%29.png)

### Product Management

![Product Management](./screenshots/Screenshot%20%28205%29.png)

### Order Management

![Order Management](./screenshots/Screenshot%20%28206%29.png)

### Customer CRM

![Customer CRM](./screenshots/Screenshot%20%28207%29.png)

### Conversations / Voice UI

![Conversations / Voice UI](./screenshots/Screenshot%20%28208%29.png)

### AI Agent Control Center

![AI Agent Control Center](./screenshots/Screenshot%20%28209%29.png)

### WhatsApp Business Integration

![WhatsApp Business Integration](./screenshots/Screenshot%20%28210%29.png)

### Settings

![Settings](./screenshots/Screenshot%20%28211%29.png)

### Bargaining / Negotiation UI

![Bargaining / Negotiation UI](./screenshots/Screenshot%20%28212%29.png)

---

## 👨‍💻 Developer

**Ahmad Abdullah**  
*AI Engineer*

Focus Areas:
- Generative AI & AI Agents
- Machine Learning & Data Science
- Computer Vision
- Data Analytics
- AI Automation
- Full Stack AI Applications

🌐 **Portfolio:** [abdullah.devsil.com](https://abdullah.devsil.com/)
