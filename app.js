import express from 'express';
import configureApp from './config/config.js';
import sequelize from './config/dbConfig.js';
import welcomeRoute from './routes/welcomeRoute.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import shelfRoutes from './routes/shelfRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// Apply general application configuration
configureApp(app);

// Setup routes
app.use('/', welcomeRoute);
app.use('/api/', inventoryRoutes);
app.use('/api', shelfRoutes);

// Test the DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
