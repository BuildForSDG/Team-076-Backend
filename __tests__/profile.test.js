import request from 'supertest';

import app from '../src/app';
import { User } from '../src/app/models';

describe('GET /api/profile tests', () => {
  beforeAll(async () => {
    await User.create({
      farmingType: 'Tomatoes',
      username: '09076421869',
      password: '$2b$10$rnlk67ws3O3AIH.B5x7SluPrfy.2/ASTDYTCslb8.9r4LAbrDzipG',
      name: 'Jack Rich'
    });
  });

  it('should only allow authorized access', async () => {
    const badResponse = await request(app).get('/api/profile');
    expect(badResponse.status).toBe(401);

    const badResponseTwo = await request(app).get('/api/profile').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjA5MDc2NDIxODcwIn0.bpFho5k4bbIeg93GNHm6YO1bN7UhJkGJu_J4_sSyo_w');
    expect(badResponseTwo.status).toBe(401);

    const goodResponse = await request(app).get('/api/profile').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjA5MDc2NDIxODY5In0.W5mokDyMkDfO6wIR5C8vxe1dxZ6eth37qCSbN47tQTk');
    expect(goodResponse.status).toBe(200);
  });
});
