import app from './express/app.js';
import sequelize from './sequelize/models/index.js';
const port = process.env.PORT || 3000;

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
}

async function init() {
  await assertDatabaseConnectionOk();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

init();
