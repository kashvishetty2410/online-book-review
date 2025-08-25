const axios = require("axios");
const BASE_URL = "http://localhost:3000";

// ---- Task 10: Get All Books (Callback) ----
function getAllBooks(callback) {
  axios.get(`${BASE_URL}/books`)
    .then(res => callback(null, res.data))
    .catch(err => callback(err));
}

// ---- Task 11: Search by ISBN (Promise) ----
function getBookByISBN(isbn) {
  return axios.get(`${BASE_URL}/books/${isbn}`)
    .then(res => res.data);
}

// ---- Task 12: Search by Author (async/await) ----
async function getBooksByAuthor(author) {
  const res = await axios.get(`${BASE_URL}/books/author/${author}`);
  return res.data;
}

// ---- Task 13: Search by Title (async/await) ----
async function getBooksByTitle(title) {
  const res = await axios.get(`${BASE_URL}/books/title/${title}`);
  return res.data;
}

// Run tasks in sequence
(async function runTasks() {
  console.log("---- Task 10: Get All Books (Callback) ----");
  await new Promise((resolve) => {
    getAllBooks((err, books) => {
      if (err) console.error("Error:", err.message);
      else console.log("Books:", books);
      resolve();
    });
  });

  console.log("\n---- Task 11: Search by ISBN (Promise) ----");
  try {
    const book = await getBookByISBN("12345");
    console.log("Book:", book);
  } catch (err) {
    console.error("Error:", err.message);
  }

  console.log("\n---- Task 12: Search by Author (async/await) ----");
  try {
    const booksByAuthor = await getBooksByAuthor("George Orwell");
    console.log("Books by George Orwell :", booksByAuthor);
  } catch (err) {
    console.error("Error:", err.message);
  }

  console.log("\n---- Task 13: Search by Title (async/await) ----");
  try {
    const booksByTitle = await getBooksByTitle("1984");
    console.log("Books with title 1984 :", booksByTitle);
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
