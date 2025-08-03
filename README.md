# EVTservices – Welfare Bus Management System

A full-stack application for managing employee transportation, developed for Electric Vehicles (Thailand) PLC (EVT). The system includes:

- Real-time bus tracking using GPS
- check-in and check-out system
- Seat reservation functionality
- Factory and route filtering per shift
- LINE OA integration for user notifications

---

##  Tech Stack

**Frontend**: React.js  
**Backend**: Node.js, Express.js  
**Database**: PostgreSQL (with Sequelize ORM)  
**Messaging**: LINE OA API  

---

## 🔧 Prerequisites

Make sure you have the following installed:

- Node.js
- PostgreSQL
- Git
- npm or yarn

---

## 📦 Project Setup

1. **Start Docker**
docker-compose up --build

2. **Install Dependencies**
npm install

3. **Seed Data**
- node seedAll.js
- node seedStops.js
- node seedBus.js
- node seedSchedule.js

4. **Start Backend Server**
- node index.js
Visit: http://localhost:5001




