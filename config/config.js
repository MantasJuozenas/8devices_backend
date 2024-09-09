import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const configureApp = (app) => {
  // Middleware setup
  app.use(express.json());
  app.use(morgan('tiny')); // HTTP request logger
  app.use(cors()); // Enable Cross-Origin Resource Sharing

  // Custom error handling middleware (optional)
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // 404 handler
  app.use((req, res, next) => {
    res.status(404).send('Sorry, we cannot find that!');
  });
};

export default configureApp;
