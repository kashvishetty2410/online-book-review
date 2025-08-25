# 📚 Online Book Review System

A simple **Node.js + Express** based API for managing books and reviews.  
This project demonstrates different ways of handling asynchronous operations in JavaScript (callbacks, promises, and async/await) while building a book review system.

---

## 🚀 Features
- View all books (Callback, Promises, Async/Await examples)
- Search books by:
  - ISBN  
  - Author  
  - Title  
- Add or update book reviews (JWT Authentication required)
- Modular routes and in-memory book database

---

## 📂 Project Structure
online-book-review/
│── server.js          # Main Express server  
│── booksdb.js         # In-memory database of books  
│── routes/            # API route handlers  
│── client.js          # Test client using axios  
│── package.json       # Dependencies and scripts  
│── README.md  
│── LICENSE  
│── CODE_OF_CONDUCT.md  
│── CONTRIBUTING.md  

---

## ⚡ Installation & Usage

### 1. Clone the Repository
    git clone https://github.com/kashvishetty2410/online-book-review.git
    cd online-book-review

### 2. Install Dependencies
    npm install

### 3. Start the Server
    node server.js

> By default, the server runs on **http://localhost:3000**

### 4. Run the Client
    node client.js

---

## 🛠 API Endpoints

| Method | Endpoint                  | Description               |
|--------|---------------------------|---------------------------|
| GET    | `/books`                  | Get all books             |
| GET    | `/books/:isbn`            | Get book by ISBN          |
| GET    | `/books/author/:author`   | Get books by author       |
| GET    | `/books/title/:title`     | Get books by title        |
| POST   | `/books/:isbn/review`     | Add or update a review    |

---

## 🤝 Contributing
Contributions are always welcome!  
Please check out [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).

---

## ✨ Acknowledgments
- Built with **Node.js**, **Express**, and **Axios**
- Example project for learning callbacks, promises, and async/await in JavaScript
