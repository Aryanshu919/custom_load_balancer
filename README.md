# 🚀 Node.js Load Balancer (Round Robin)

A simple load balancer built with **Node.js + Express + Axios** that distributes incoming traffic across multiple backend servers using the **Round Robin** algorithm.

This project demonstrates core **System Design fundamentals** like:

- Horizontal Scaling
- Health Checks
- Failover Handling
- Request Forwarding
- Basic Reverse Proxy Behavior

---

## 📌 Features

✅ Round Robin load balancing  
✅ Health monitoring of backend servers  
✅ Automatic removal of unhealthy servers  
✅ Automatic re-adding of recovered servers  
✅ Handles all HTTP methods  
✅ Graceful failure handling (503 / 502 responses)

---

## 🏗️ Architecture

```
Client → Load Balancer (Port 3000)
               ↓
     -----------------------
     |                     |
Backend 1 (8081)   Backend 2 (8082)
```

---

## 🛠️ Tech Stack

- Node.js
- Express (v5)
- Axios

---

## 📂 Project Structure

```
load-balancer/
│
├── loadBalancer.js
├── server1.js
├── server2.js
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/load-balancer.git
cd load-balancer
```

### 2️⃣ Install Dependencies

```bash
npm install
```

---

## ▶️ Running the Project

### Start Backend Server 1

```bash
node server1.js
```

### Start Backend Server 2

```bash
node server2.js
```

### Start Load Balancer

```bash
node loadBalancer.js
```

Load balancer runs on:

```
http://localhost:3000
```

---

## 🧪 How to Test Load Balancing

### Manual Browser Test

Refresh:

```
http://localhost:3000
```

You should see alternating responses:

```
Response from Server 1
Response from Server 2
Response from Server 1
Response from Server 2
```

## 🩺 Health Check System

Each backend server exposes:

```
GET /health
```

If a server:
- Fails
- Crashes
- Stops responding

It is automatically removed from the active pool.

When it comes back online, it is automatically re-added.

---

## ⚠️ Error Handling

- `502 Bad Gateway` → Backend unreachable
- `503 Service Unavailable` → No healthy servers available

---

## 📚 What This Project Demonstrates

This project is great for learning:

- Horizontal Scaling concepts
- Load Balancer design
- Reverse proxy fundamentals
- Backend fault tolerance
- System Design interview preparation


## 👨‍💻 Author

Aryan  

If you found this helpful, feel free to ⭐ the repository!

---

## 📖 License

MIT License
