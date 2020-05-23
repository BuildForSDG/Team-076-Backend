import request from 'supertest';

import app from '../src/app';
import { User } from '../src/app/models';
import helpers from './test.helper';
import farmingTypes from '../src/app/constants/farmingTypes';

const { TestDB } = helpers;

describe('POST /api/register Tests', () => {
  const route = '/api/register';

  beforeAll(async () => {
    await User.create({
      name: 'Charles',
      username: '08000001234',
      farmingType: 'Tomatoes',
      password: 'password' // unhashed because it doesn't matter for the test
    });
  });

  /**
   * TODO: Test to check for a bad request reply from server
   */

  it('should correctly register a valid user', async () => {
    const user = {
      name: 'Jack Rich',
      username: '09076421865',
      farmingType: 'Tomatoes',
      password: 'password'
    };

    const { body, status } = await request(app).post(route).send(user);
    expect(status).toBe(200);
    expect(await TestDB.has('Users', {
      name: 'Jack Rich',
      username: '09076421865'
    })).toBeTruthy();
    expect(body.success).toBeTruthy();
    expect(body.message).toBe('Successfully Registered');
  });

  it('should deny a registration with incomplete data', async () => {
    const { body, status } = await request(app).post(route).send({
      name: 'Sidi',
      username: '08001234567',
      password: 'password'
    }); // no farming type
    expect(status).toBe(200);
    expect(body.success).toBeFalsy();
    expect(body.message).toBe('Input Validation Error');
    expect(body.data.reasons).toContain('Invalid farming type');
  });

  it('should deny a registration with invalid data', async () => {
    const { body, status } = await request(app).post(route).send({
      name: 'Sidi',
      username: '876',
      farmingType: 'Lettuce',
      password: 'pass' // password length of minimum 8 characters
    });
    expect(status).toBe(200);
    expect(body.success).toBeFalsy();
    expect(body.message).toBe('Input Validation Error');
    expect(body.data.reasons).toContain('Invalid password');
    expect(body.data.reasons).toContain('Invalid username');
  });

  it('should deny a registration with an already registered username', async () => {
    const { body, status } = await request(app).post(route).send({
      name: 'Charles',
      username: '08000001234',
      farmingType: 'Tomatoes',
      password: 'password'
    });

    expect(status).toBe(200);
    expect(body.success).toBeFalsy();
    expect(body.message).toBe('Input Validation Error');
    expect(body.data.reasons).toContain('Username already exists');
  });

  it('should check if username exists (already exists)', async () => {
    const { body, status } = await request(app).get(`${route}/checkUsername`).send({
      username: '08000001234'
    });

    expect(status).toBe(200);
    expect(body.success).toBeFalsy();
    expect(body.message).toBe('Username already exists');
  });

  it('should check if username exists (does not exist)', async () => {
    const { body, status } = await request(app).get(`${route}/checkUsername`).send({
      username: '08000001235'
    });

    expect(status).toBe(200);
    expect(body.success).toBeTruthy();
    expect(body.message).toBe('Username is available');
  });

  it('should get farmingTypes options as an array', async () => {
    const { body, status } = await request(app).get(`${route}/farmingTypes`);
    expect(status).toBe(200);
    expect(body.success).toBeTruthy();
    expect(body.data.farmingTypes).toMatchObject(Array.from(farmingTypes));
  });

  // it('denies an invalid login attempt (wrong password)', async () => {
  //   const { body, status } = await request(app).post(route).send({
  //     username: '876',
  //     password: 'password'
  //   });
  //   expect(status).toBe(200);
  //   expect(body.success).toBeFalsy();
  //   expect(body.message).toBe('Invalid login details');
  // });
});
