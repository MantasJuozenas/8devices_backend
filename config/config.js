import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

export const configureApp = (app) => {
  app.use(express.json());
  app.use(morgan('tiny'));
  app.use(cors());
};
