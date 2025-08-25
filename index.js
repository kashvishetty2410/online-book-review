const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const books = require('./books.json');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_jwt_secret_key';

app.use(express.json());

// In-memory users storage
let users = {};

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Online Book Review API!');
});

//////////////////////
// General Users (Tasks 1–5)
//////////////////////

// Task 3: Get all books by author (async/await)
app.get('/books/author/:author', async (req, res) => {
  const authorName = req.params.author.toLowerCase();
  try {
    const getBooksByAuthor = () => new Promise((resolve) => {
      const filtered = Object.values(books).filter(
        book => book.author.toLowerCase() === authorName
      );
      resolve(filtered);
    });
    const booksByAuthor = await getBooksByAuthor();
    if (booksByAuthor.length > 0) res.json(booksByAuthor);
    else res.status(404).json({ error: `No books found by author ${req.params.author}` });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Task 4: Get all books by title (async/await)
app.get('/books/title/:title', async (req, res) => {
  const titleName = req.params.title.toLowerCase();
  try {
    const getBooksByTitle = () => new Promise((resolve) => {
      const filtered = Object.values(books).filter(
        book => book.title.toLowerCase() === titleName
      );
      resolve(filtered);
    });
    const booksByTitle = await getBooksByTitle();
    if (booksByTitle.length > 0) res.json(booksByTitle);
    else res.status(404).json({ error: `No books found with title ${req.params.title}` });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Task 2: Get book by ISBN (Promises)
app.get('/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const getBookByISBN = new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) resolve(book);
    else reject(`Book with ISBN ${isbn} not found`);
  });

  getBookByISBN
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ error: err }));
});

// Task 1: Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Task 5: Get book reviews
app.get('/books/:isbn/reviews', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) res.json(book.reviews || {});
  else res.status(404).json({ error: `Book with ISBN ${isbn} not found` });
});

//////////////////////
// User Registration/Login (Tasks 6–7)
//////////////////////

// Task 6: Register new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  if (users[username]) return res.status(400).json({ error: 'User already exists' });

  users[username] = { password };
  res.json({ message: 'User registered successfully' });
});

// Task 7: Login as registered user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (!user || user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

//////////////////////
// Middleware for protected routes
//////////////////////
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded.username;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

//////////////////////
// Registered Users (Tasks 8–9)
//////////////////////

// Task 8: Add/Modify book review
app.post('/books/:isbn/review', authenticate, (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.user;

  const book = books[isbn];
  if (!book) return res.status(404).json({ error: 'Book not found' });

  if (!book.reviews) book.reviews = {};
  book.reviews[username] = review;
  res.json({ message: 'Review added/modified', reviews: book.reviews });
});

// Task 9: Delete own book review
app.delete('/books/:isbn/review', authenticate, (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user;

  const book = books[isbn];
  if (!book) return res.status(404).json({ error: 'Book not found' });

  if (book.reviews && book.reviews[username]) {
    delete book.reviews[username];
    res.json({ message: 'Review deleted', reviews: book.reviews });
  } else {
    res.status(404).json({ error: 'No review found for this user' });
  }
});

//////////////////////
// Start server
//////////////////////
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
