require('dotenv').config();
const express = require('express');
const cors = require('cors');
const assetsRouter = require('./routes/assets');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/assets', assetsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
