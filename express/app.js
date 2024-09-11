import express from 'express';
import configureApp from './configExpress.js';
import welcomeRoute from './routes/welcomeRoute.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import shelfRoutes from './routes/shelfRoutes.js';
import inventoryTypeRoutes from './routes/inventoryTypeRoutes.js';

const app = express();

// Apply general application configuration
configureApp(app);

// Setup routes
app.use('/', welcomeRoute);
app.use('/api', inventoryRoutes);
app.use('/api', shelfRoutes);
app.use('/api', inventoryTypeRoutes);

export default app;
