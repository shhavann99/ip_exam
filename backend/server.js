const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let articles = [
  {
    id: 1,
    title: 'Choosing the Right Career Path',
    body: 'Finding the right career path involves...',
  },
  {
    id: 2,
    title: 'Improving Interview Skills',
    body: 'Interviews can be stressful, but...',
  },
  {
    id: 3,
    title: 'Networking for Career Growth',
    body: 'Building a professional network is key...',
  },
  {
    id: 4,
    title: 'Networking for finance Growth',
    body: 'Building a professional network is key...',
  },
];

app.get('/api/articles', (req, res) => {
  res.json(articles);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Inquiry from ${name} (${email}): ${message}`);
  res.json({ message: 'Inquiry submitted successfully' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
