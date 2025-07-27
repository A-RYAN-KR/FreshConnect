# FreshConnect 🥭

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) ![Stars](https://img.shields.io/github/stars/sm00th76/freshconnect?style=social)

A full-stack web platform built with the MERN stack, designed to connect street food vendors with verified raw material suppliers across India. FreshConnect aims to bring transparency, trust, and efficiency to the local food supply chain.

[**Live Demo**](https://your-live-app-link.com)

---

![FreshConnect Screenshot](./screenshot.png)

## Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

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
| **Axios** | **JWT** | | **Vercel / Netlify** (Frontend) |
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
    You can run the frontend and backend servers separately.

    - **Run the Backend Server (from the `backend` folder):**
      ```sh
      npm run dev
      ```
    - **Run the Frontend Server (from the `frontend` folder):**
      ```sh
      npm start
      ```
    The application should now be running, with the frontend on `http://localhost:3000` and the backend on `http://localhost:5001`.

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
| `GET`       | `/api/orders/myorders`      | (Vendor) Get all orders placed by you.    | Yes       |
| `GET`       | `/api/orders/supplier`      | (Supplier) Get all orders received.       | Yes       |
| `PUT`       | `/api/orders/:id/status`    | (Supplier) Update an order's status.      | Yes       |
| `POST`      | `/api/contact`              | Send a message via the contact form.      | No        |

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please see the `CONTRIBUTING.md` file for our contribution guidelines.

---

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

---

## Contact

Baladitya Khantwal - [LinkedIn](https://www.linkedin.com/in/baladitya-khantwal-16204b291)

Project Link: [https://github.com/sm00th76/freshconnect](https://github.com/sm00th76/freshconnect)
