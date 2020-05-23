import { User } from '../../models';
import AuthService from '../../services/auth.service';
import UserValidator from '../../validators/user.validator';

class LoginController {
  constructor(userModel, authService, userValidator) {
    this.userModel = userModel;
    this.authService = authService;
    this.userValidator = userValidator;
    this.loginUser = this.loginUser.bind(this);
  }

  async loginUser(req, res) {
    const { body } = req;

    const validationResult = await this.userValidator.validateLoginUser(body);

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

    let user;
    try {
      user = await this.userModel.findOne({
        where: {
          username: body.username
        },
        raw: true
      });
    } catch (error) {
      // log the error
      // handle server reply corrcctly for invalid data (return a 400 bad request)
      res.sendStatus(500);
      return;
    }

    if (user && this.authService.verifyPassword(body.password, user.password)) {
      res.json({
        success: true,
        message: 'Successfully logged in',
        data: {
          token: this.authService.createToken({
            username: user.username
          })
        }
      });
      return;
    }

    res.json({
      success: false,
      message: 'Invalid login details'
    });
  }
}

const loginController = new LoginController(User, AuthService, UserValidator);

export default loginController;
