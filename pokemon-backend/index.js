const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// Index
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Get Pokemons
app.get('/pokemons', async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
  )