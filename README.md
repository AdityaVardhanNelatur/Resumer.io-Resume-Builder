📄 Resumer.io – Resume Builder (MERN Stack)

A full-stack online Resume Builder built using the MERN stack that allows users to create, edit, manage, and download professional resumes through a secure and user-friendly web platform.

📌 Project Overview

Resumer.io is a web-based resume creation platform designed to help users easily build and maintain professional resumes.
It provides secure authentication, resume management, live preview, resume upload, and PDF export, enabling users to create resumes from scratch or edit existing ones in one centralized system.

The system supports multiple users, each with their own dashboard to manage their resumes.

🚀 Features

🔐 Authentication

User Signup and Login

Secure JWT-based authentication

Protected routes

📄 Resume Management

Create new resumes

Edit existing resumes

Delete resumes

Store multiple resumes per user

📤 Resume Upload

Upload existing resume files

Extract content for editing

👀 Live Resume Preview

Real-time preview while editing

📥 PDF Download

Export resumes in professional PDF format

📊 Dashboard

View and manage all resumes from a single interface

🛠️ Tech Stack
Frontend

React.js

Tailwind CSS

Backend

Node.js

Express.js

JWT Authentication

Database

MongoDB

🧩 System Architecture
React Frontend  →  Express API  →  MongoDB
        │               │
        │               └── JWT Authentication
        │
        └── Resume Upload, Preview & PDF Generator

🔐 Authentication Flow

User registers or logs in

JWT token is generated

Token is used to access protected APIs

Only authenticated users can manage resumes

📂 Folder Structure (High Level)
client/
   └── React + Tailwind UI

server/
   └── Express APIs
   └── JWT Auth
   └── Resume CRUD
   └── File Upload
   └── MongoDB Models

⚙️ How to Run Locally
1️⃣ Clone the Repository
git clone https://github.com/yourusername/resumer.io
cd resumer.io

2️⃣ Start Backend
cd server
npm install
npm start

3️⃣ Start Frontend
cd client
npm install
npm run dev

📈 Future Enhancements

Resume templates

Cloud storage

Version history

Cover letter support

Mobile responsive UI

🎯 Use Cases

Students creating their first resumes

Job seekers updating CVs

Professionals managing multiple resume versions

## Screenshots
<img width="3200" height="2000" alt="Screenshot (170)" src="https://github.com/user-attachments/assets/b9b558fc-c7b7-4ec2-903b-ba05cfff67a7" />
<img width="3200" height="2000" alt="Screenshot (171)" src="https://github.com/user-attachments/assets/9c79f205-88d4-4c6a-b7df-7709eabfea05" />
<img width="3200" height="2000" alt="Screenshot (172)" src="https://github.com/user-attachments/assets/99cc9e9f-736a-44f8-adec-1b2c97044caf" />
<img width="3200" height="2000" alt="Screenshot (173)" src="https://github.com/user-attachments/assets/3e19b3de-4fc3-4da4-89ec-3f0e92120f06" />
<img width="3200" height="2000" alt="Screenshot (174)" src="https://github.com/user-attachments/assets/66593b81-6220-44b7-93d8-b2456dfc5112" />
<img width="3200" height="2000" alt="Screenshot (175)" src="https://github.com/user-attachments/assets/ba8d2d75-52b7-4e4d-8e22-db01000ffb3c" />
<img width="3200" height="2000" alt="Screenshot (176)" src="https://github.com/user-attachments/assets/e5bb57c7-1613-475f-820b-9027c930e3ce" />










