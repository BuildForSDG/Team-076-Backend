import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


/**
 * Should have been a constructor which takes a class that implements an adapter interface
 * for different types of encryption strategies. No dependency injection system in this project
 */
class AuthService {
  /**
   * Creates a signed token
   * @param {*} payload
   */
  static createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }

  /**
   * Makes a hash of the password
   * @param {String} normalPassword
   */
  static hashPassword(normalPassword) {
    return bcrypt.hashSync(normalPassword, 10);
  }

  static verifyPassword(normalPassword, encryptedPassword) {
    return bcrypt.compareSync(normalPassword, encryptedPassword);
  }
}

export default AuthService;
