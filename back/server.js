const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware CORS pour autoriser le frontend à communiquer avec le backend
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
