import { sequelize } from '../src/app/models';

beforeAll(async () => {
  await sequelize.truncate();
});
