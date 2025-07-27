# FreshConnect 🥭

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) 

A full-stack web platform built with the MERN stack, designed to connect street food vendors with verified raw material suppliers across India. FreshConnect aims to bring transparency, trust, and efficiency to the local food supply chain.

[**Live Demo**](https://fresh-connect-nexus.vercel.app/)

---

## Table of Contents

- [Application Preview](#application-preview)
- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Our Team](#our-team)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Application Preview

A glimpse into the FreshConnect platform, from the landing page to the functional user dashboards.

<table>
  <tr>
    <td align="center"><strong>Landing Page & Multi-Language Support</strong></td>
    <td align="center"><strong>Clean & Simple Login</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/dad5a670-df9f-4c73-aca5-ab887a13465e" alt="FreshConnect Landing Page with language options"></td>
    <td><img src="https://github.com/user-attachments/assets/ea7aef10-3f67-4f27-850a-919d282f7973" alt="FreshConnect Login Page"></td>
  </tr>
  <tr>
    <td align="center"><strong>Supplier Dashboard</strong></td>
    <td align="center"><strong>Vendor Complaint System</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/7af6b8ec-9602-4b27-9ef7-4a1ce2aba462" alt="Supplier dashboard showing product inventory"></td>
    <td><img src="https://github.com/user-attachments/assets/1d9a627d-1ce8-491c-a2d7-fe0c70a0bd14" alt="Vendor complaint modal with image upload"></td>
  </tr>
</table>

<!-- 
**Note:** Make sure you have a `screenshots` folder in your project's root with the following images:
- `screenshot-landing.png`
- `screenshot-login.png`
- `screenshot-supplier-dashboard.png`
- `screenshot-vendor-complaint.png`
-->

---

## About The Project

**FreshConnect** tackles a core challenge in the local food industry: the disconnect between street food vendors and reliable suppliers. Vendors struggle to find fresh ingredients at fair prices, while suppliers lack a broad, organized market to sell their goods.

This platform serves as a centralized B2B marketplace built on a foundation of trust and transparency. It empowers vendors to make informed purchasing decisions and helps suppliers grow their business by reaching a wider, verified customer base.

---

## Key Features

The platform offers a tailored experience for its two primary user roles:

| For Street Food Vendors 🧑‍🍳 | For Raw Material Suppliers 🚚 |
| :------------------------------------------------ | :---------------------------------------------------- |
| **Find Trusted Suppliers:** Browse a curated list.   | **List Products:** Showcase your inventory.           |
| **Compare Prices:** Make cost-effective decisions.   | **Manage Orders:** Fulfill orders efficiently.        |
| **Join Group Orders:** Get bulk-rate discounts.      | **Bid on Group Orders:** Secure large volume sales.   |
| **Track Deliveries:** Real-time order tracking.      | **Analytics Dashboard:** Gain insights into sales.    |

### Core Platform Features

-   ✅ **Dual User Roles:** Separate registration and dashboards for Vendors and Suppliers.
-   🔒 **GSTIN & License Verification:** All suppliers are manually verified to ensure authenticity.
-   ⭐ **AI-Powered Trust Ratings:** Reviews are analyzed for sentiment to provide genuine, reliable trust scores.
-   📧 **Automated Email Notifications:** Instant alerts for new orders and status updates using Nodemailer.
-   🔐 **Secure Authentication:** JWT-based authentication to protect user accounts and data.
-   💬 **24/7 Support:** A dedicated contact channel for resolving issues and ensuring smooth operations.

---

## Tech Stack

This project is built using modern web technologies:

| Frontend | Backend | Database | Deployment & Other |
| :------- | :------ | :------- | :----------------- |
| **React.js** | **Node.js** | **MongoDB** | **Cloudinary** (Image Storage) |
| **Redux Toolkit** | **Express.js** | **Mongoose** | **Nodemailer** (Emails) |
| **Axios** | **JWT** | | **Vercel** (Frontend) |
| **Tailwind CSS** | | | **Render / Cyclic** (Backend) |

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally or a MongoDB Atlas URI.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/sm00th76/freshconnect.git
    cd freshconnect
    ```

2.  **Install Backend Dependencies:**
    ```sh
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

4.  **Set Up Environment Variables:**
    Create a `.env` file in the `backend` directory and add the following variables. Use the `.env.example` as a guide.
    ```
    # Server Configuration
    PORT=5001
    MONGO_URI=your_mongodb_connection_string

    # JWT Secret
    JWT_SECRET=your_super_secret_jwt_key

    # Nodemailer (Gmail App Password)
    EMAIL_USER=your-gmail-address@gmail.com
    EMAIL_PASS=your-16-character-app-password
    ADMIN_EMAIL=admin-email-to-receive-notifications@example.com

    # Cloudinary (for image uploads)
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

5.  **Run the Application:**
    - **Backend Server (from the `backend` folder):**
      ```sh
      npm run dev
      ```
    - **Frontend Server (from the `frontend` folder):**
      ```sh
      npm start
      ```

---

## API Endpoints

A brief overview of the core API routes:

| HTTP Method | Route Endpoint              | Description                               | Protected |
| :---------- | :-------------------------- | :---------------------------------------- | :-------: |
| `POST`      | `/api/users/register`       | Register a new Vendor or Supplier.        | No        |
| `POST`      | `/api/users/login`          | Authenticate a user and get a JWT.        | No        |
| `POST`      | `/api/products`             | (Supplier) Create a new product listing.  | Yes       |
| `GET`       | `/api/products`             | Get all available products.               | No        |
| `POST`      | `/api/orders`               | (Vendor) Create a new order.              | Yes       |
| `PUT`       | `/api/orders/:id/status`    | (Supplier) Update an order's status.      | Yes       |
| `POST`      | `/api/contact`              | Send a message via the contact form.      | No        |

---

## Our Team

This project was brought to life by a dedicated team of developers and thinkers.

| Name | Contribution | Profile |
| :--- | :----------- | :------ |
| **Aryan Jha** | Frontend & Backend | [![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=flat-square&logo=github)](https://github.com/A-RYAN-KR) <!--- Replace username --> |
| **Ashish Kumar** | Backend & DBMS | [![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=flat-square&logo=github)](https://github.com/Ash22686) <!--- Replace username --> |
| **Aryaa Sharma** | Ideation & UI/UX | [![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=flat-square&logo=github)](https://github.com/aryaa-05) <!--- Replace username --> |
| **Baladitya Khantwal**| GenAI | [![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=flat-square&logo=github)](https://github.com/sm00th76) |

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please see the `CONTRIBUTING.md` file for our contribution guidelines.

---

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

---

## Contact
LinkedIn : [**LinkedIn**](https://www.linkedin.com/posts/baladitya-khantwal-16204b291_mernstack-webdevelopment-reactjs-activity-7355302873464791041-q6R5?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEap3xoBTvhOeA7wA2PtCLPTNfgWNLGqiMg)
Project Link: [**repo link**](https://github.com/A-RYAN-KR/FreshConnect.git)
