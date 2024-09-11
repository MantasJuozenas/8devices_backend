import { execSync } from 'child_process';

beforeAll(async () => {
  execSync('NODE_ENV=test npx sequelize-cli db:migrate --env test --config config/config.mjs', { stdio: 'inherit' });
});

afterAll(async () => {
  execSync('NODE_ENV=test npx sequelize-cli db:migrate:undo:all --env test --config config/config.mjs', {
    stdio: 'inherit',
  });
});
