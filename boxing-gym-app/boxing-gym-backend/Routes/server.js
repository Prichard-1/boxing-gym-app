const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json()); // Parse JSON in POST requests

// Import routes
const plansRoutes = require('./routes/plans');
app.use('/api/plans', plansRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
