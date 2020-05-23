import UserValidator from './user.validator';
import { User } from '../models';

describe('User Vaidator Tests', () => {
  beforeAll(async () => {
    await User.create({
      name: 'David',
      username: '08001234567',
      farmingType: 'Tomatoes',
      password: 'guessMarker'
    });
  });

  it('should correctly validate a new user object (valid data)', async () => {
    const result = await UserValidator.validateNewUser({
      name: 'Charles',
      username: '08002345678',
      farmingType: 'Tomatoes',
      password: 'goodPassword'
    });

    expect(result).toHaveProperty('valid', true);
    expect(result).toHaveProperty('reasons', []);
  });

  it('should correctly validate a new user (invalid data)', async () => {
    const result = await UserValidator.validateNewUser({
      name: 'Charles',
      username: '080',
      farmingType: 'Tomatoes',
      password: 'good'
    });

    expect(result).toHaveProperty('valid', false);
    expect(result).toHaveProperty('reasons', ['Invalid username', 'Invalid password']);
  });

  it('should correctly validate a new user (already used username)', async () => {
    const result = await UserValidator.validateNewUser({
      name: 'Charles',
      username: '08001234567',
      farmingType: 'Tomatoes',
      password: 'goodPassword'
    });

    expect(result).toHaveProperty('valid', false);
    expect(result).toHaveProperty('reasons', ['Username already exists']);
  });

  it('should check if user exists already', async () => {
    expect(await UserValidator.userExists('08001234567')).toBeTruthy();
    expect(await UserValidator.userExists('acne')).toBeFalsy();
  });

  it('should accept only valid passwords of 8 or above characters', () => {
    expect(UserValidator.isValidPassword('password')).toBeTruthy();
    expect(UserValidator.isValidPassword('pass')).toBeFalsy();
  });

  it('should accept only valid usernames', () => {
    expect(UserValidator.isValidUsername('david')).toBeTruthy();
    expect(UserValidator.isValidUsername('a')).toBeFalsy();
  });
});
