// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Sample quiz questions
const questions = [
  {
    id: 1,
    question: "1. What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    id: 2,
    question: "2. planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    id: 3,
    question: "3. What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    id: 4,
    question: "4. Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Gold", "Silver", "Iron"],
    answer: "Oxygen"
  },
  {
    id: 5,
    question: "5. What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2"
  },
];

// GET request to fetch quiz questions
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
