import express from 'express';
const welcomeRoute = express.Router();

welcomeRoute.get('/', (req, res) => {
  res.send('Welcome to 8devices inventory managament system');
});

export { welcomeRoute };
