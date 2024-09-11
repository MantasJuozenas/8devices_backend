import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const configureApp = (app) => {
  // Middleware setup
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('tiny')); // HTTP request logger
  app.use(cors()); // Enable Cross-Origin Resource Sharing
};

export default configureApp;
