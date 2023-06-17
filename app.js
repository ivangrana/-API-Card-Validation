const express = require('express');
const app = express();

const cardRoutes = require('./routes/cardRoutes');

app.use(express.json());
app.use('/card', cardRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
