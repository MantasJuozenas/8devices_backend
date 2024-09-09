import express from 'express';
import { welcomeRoute } from '../routes/welcomeRoute.js';
import { configureApp } from '../config/config.js';

const app = express();

const port = process.env.PORT || 3000;

// Apply middleware configurations
configureApp(app);

// Setup routes
app.use('/', welcomeRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

export default app;
