import { User } from '../../models';
import UserValidator from '../../validators/user.validator';
import AuthService from '../../services/auth.service';

class RegisterController {
  constructor(userModel, authService, userValidator) {
    this.userModel = userModel;
    this.authService = authService;
    this.userValidator = userValidator;
    this.registerUser = this.registerUser.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
  }

  /**
   * Handler function for POST /api/register
   * @param {*} req - the request object
   * @param {*} res - the response object
   */
  async registerUser(req, res) {
    const { body } = req;

    const input = {
      name: body.name,
      username: body.username,
      farmingType: body.farmingType,
      password: body.password
    };

    const validationResult = await this.userValidator.validateNewUser(input);
    if (!validationResult.valid) {
      res.json({
        success: false,
        message: 'Input Validation Error',
        data: {
          reasons: validationResult.reasons
        }
      });
      return;
    }

    const user = {
      ...input,
      password: this.authService.hashPassword(body.password)
    };

    try {
      await this.userModel.create(user);
    } catch (error) {
      res.sendStatus(500);
      return;
    }

    res.json({
      success: true,
      message: 'Successfully Registered'
    });
  }

  async checkUsername(req, res) {
    const { body } = req;
    const exists = await this.userValidator.userExists(body.username);
    res.json({
      success: !exists,
      message: exists ? 'Username already exists' : 'Username is available'
    });
  }
}

const registerController = new RegisterController(User, AuthService, UserValidator);

export default registerController;
