To run project properly first step is to run npm install.

Rename .env copy to .env and change variable names accordingly if necessary.

To create a database run node sequelize/scripts/runAllScripts.js

To create mock data run node sequelize/scripts/seedInventory.js

To migrate tables to test db for tests use this command: NODE_ENV=test npx sequelize-cli db:migrate --config sequelize/config/config.mjs --migrations-path sequelize/migrations

To start a server run the following command: npm start

For tests run the following command: npm test
