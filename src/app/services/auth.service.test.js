import jwt from 'jsonwebtoken';

import AuthService from './auth.service';

describe('Auth Service Unit Test', () => {
  it('should verify passwords', () => {
    // the hashed version of password
    const hashed = '$2b$10$wWQkbEEJYqok67/ygesbgOwJNDF5UjJo8KeM8JYIF4mgIpM28hFym';
    expect(AuthService.verifyPassword('password', hashed)).toBeTruthy();
    expect(AuthService.verifyPassword('note', hashed)).toBeFalsy();
  });

  it('should create a token', () => {
    const token = AuthService.createToken({
      username: '09076421860',
      password: '$2b$10$wWQkbEEJYq',
      name: 'Jack Rich'
    });
    expect(token).toBeDefined();
    expect(jwt.verify(token, process.env.JWT_SECRET)).toBeTruthy();
  });

  it('should hash password strings', () => {
    expect(AuthService.hashPassword('password')).toBeTruthy();
    expect(AuthService.hashPassword('password')).toMatch(/\$/); // check against $ because of bcrypt
  });
});
