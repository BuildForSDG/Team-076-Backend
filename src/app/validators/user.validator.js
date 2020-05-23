import { User } from '../models';
import farmingTypes from '../constants/farmingTypes';

class UserValidator {
  static async validateNewUser(user) {
    const result = {
      valid: true,
      reasons: []
    };

    if (!this.isValidUsername(user.username)) {
      result.valid = false;
      result.reasons.push('Invalid username');
    }

    if (!this.isValidfarmingType(user.farmingType)) {
      result.valid = false;
      result.reasons.push('Invalid farming type');
    }

    if (!this.isValidPassword(user.password)) {
      result.valid = false;
      result.reasons.push('Invalid password');
    }

    if (await this.userExists(user.username)) {
      result.valid = false;
      result.reasons.push('Username already exists');
    }

    return result;
  }

  static async validateLoginUser(user) {
    const result = {
      valid: true,
      reasons: []
    };

    if (!this.isValidUsername(user.username)) {
      result.valid = false;
      result.reasons.push('Invalid username');
    }

    if (!this.isValidPassword(user.password)) {
      result.valid = false;
      result.reasons.push('Invalid password');
    }

    const exists = await this.userExists(user.username);

    if (!exists) {
      result.valid = false;
      result.reasons.push('User does not exist');
    }

    return result;
  }

  static isValidUsername(username) {
    return typeof username === 'string' && username.length > 3;
  }

  static isValidfarmingType(farmingType) {
    return typeof farmingType === 'string' && farmingTypes.has(farmingType);
  }

  static isValidPassword(password) {
    return typeof password === 'string' && password.length > 7;
  }

  static async userExists(username) {
    const user = await User.findOne({
      where: {
        username
      }
    });

    if (user) {
      return true;
    }

    return false;
  }
}

export default UserValidator;
