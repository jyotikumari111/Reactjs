const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const foodItemsRouter = require('./routes/foodItems');
app.use('/foodItems', foodItemsRouter);

mongoose.connect('mongodb://localhost:27017/food-delivery-app', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send('Hello, MongoDB!');
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
