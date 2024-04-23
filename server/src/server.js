const express = require('express');
const { json } = require('express');
const cors = require('cors');
const webserversRoutes = require('./routes');

const app = express();
const port = 3030;

// Allow CORS with proper settings
app.use(cors());
app.use(json());

// Middleware for logging requests (for debugging)
app.use((req, res, next) => {
  console.log(`Received ${req.method}`);
  next();
});

app.use('/api/v1/webservers', webserversRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));
