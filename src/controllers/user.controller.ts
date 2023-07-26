import { NULL, repository } from '@loopback/repository';
import { HttpErrors, getModelSchemaRef } from '@loopback/rest';
import { post, param, requestBody, get, patch, del } from '@loopback/openapi-v3';
import { Users, UserWithRelations } from '../models';
import { UserRepository } from '../repositories';
import { genSalt, hash, compare } from 'bcryptjs';
import { Credentials } from '@loopback/authentication-jwt';
import { randomBytes } from 'crypto';
import { EmailService } from '../services';
import { service } from 'loopback4-spring';
import {UserService} from '../services/user.service';
import { inject } from '@loopback/context';
import { config } from '../commons';

export class UserController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @service(EmailService) public emailService: EmailService,
    @inject('services.user')public userService: UserService
  ) { }

  @post('/register')
  async register(@requestBody() user: Users) {
    const foundUser = await this.userRepository.findOne({ where: { email: user.email } });

    if (foundUser) {
      let res = { statusCode: 409, message: 'Username already exists' }
      return res;
    }

    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);

    let res = this.userRepository.create(user);

    // send mail verification email notification
    const token = randomBytes(32).toString('hex');

    let pathUrl = config.FRONTEND_URL + 'auth/verify-email';
    let from = '"Users Management 👻"' + config.EMAIL_SERVICE;
    let to = user.email;
    let subject ='[User Management] email verify registration'
    let message = `Click this link to verify email: ${pathUrl}?token=${token}`;
    console.log(message);

    let resMail = await this.emailService.sendEmail(from, to, subject, message);
    console.log(resMail);

    return {statusCode: 200 , data: res};
  }

  @post('/login', {
    responses: {
      '200': {
        description: 'User login success',
        content: { 'application/json': { schema: getModelSchemaRef(Users) } },
      },
    },
  })
  async login(@requestBody() credentials: { email: string, password: string }): Promise<any> {
    const result = await this.userService.verifyCredentials(
      credentials.email,
      credentials.password,
    );

    if (!result.data) {
      let res = { statusCode: 409, message: 'Invalid credentials' }
      return res;
    }

    return JSON.stringify(result);
  }

  @post('/users/reset-password')
  async resetPassword(@requestBody() credentials: Credentials): Promise<any> {
    const foundUser = await this.userRepository.findOne({ where: { email: credentials.email } });
    if (!foundUser) {
      throw new HttpErrors.NotFound('User not found');
    }

    const token = randomBytes(32).toString('hex');

    foundUser.resetPasswordToken = token;
    await this.userRepository.updateById(foundUser.id, foundUser);

    let pathUrl = config.FRONTEND_URL + 'auth/password-reset';
    let from = '"Users Management 👻"' + config.EMAIL_SERVICE;
    let to = foundUser.email;
    let subject ='[User Management] Reset Password'
    let message = `Click this link to reset your password: ${pathUrl}?email=${credentials.email}&token=${token}`;

    console.log(message);

    let resMail = await this.emailService.sendEmail(from, to, subject, message);
    console.log(resMail);

    return { statusCode: 200, message: 'Password reset link sent to your email' };
  }

  @post('/users/verify-email')
  async verifyEmail(@requestBody() { token }: { token: string }): Promise<{ message: string }> {
    // Find the user with the given emailVerificationToken
    const foundUser = await this.userRepository.findOne({ where: { emailVerificationToken: token } });

    if (!foundUser) {
      throw new HttpErrors.NotFound('Invalid token');
    }

    // Update the user's isEmailVerified status and clear the verification token
    foundUser.isEmailVerified = true;
    foundUser.emailVerificationToken = null;

    await this.userRepository.updateById(foundUser.id, foundUser);

    return { message: 'Email verification successful' };
  }

  @post('/users/reset-password/verify')
  async verifyResetPassword(@requestBody() {email, token, password }: { email: string, token: string, password: string }): Promise<any> {
    const foundUser = await this.userRepository.findOne({ where: { resetPasswordToken: token } });
    if (!foundUser) {
      throw new HttpErrors.NotFound('Invalid token');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    foundUser.password = hashedPassword;
    foundUser.resetPasswordToken = "";

    try {
      await this.userRepository.updateById(foundUser.id, foundUser);
      return { statusCode: 200 , message: 'Password reset successful' };
    } catch (error) {
      console.log(error);
      return { statusCode: 200 , error: error.message };
    }
  }

  @get('/users')
  async find(): Promise<Users[]> {
    return this.userRepository.find({ where: { isDelete: false } });
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User with givenid',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<UserWithRelations> {
    return this.userRepository.findById(id);
  }

  @post('/app-keys/{id}', {
    responses: {
      '200': {
        description: 'General app key creation success',
        content: { 'application/json': { schema: { type: 'object' } } },
      },
    },
  })
  async createAppKey(
    @param.path.number('id') id: number,
  ): Promise<{ appKey: string }> {
    const appKey = id.toString(36) + '_' + Math.random().toString(36).slice(2) + '-' + Math.random().toString(36).slice(2);

    await this.userRepository.updateById(id, { appKey });
    return { appKey };
  }

  @post('/delete-keys/{id}', {
    responses: {
      '200': {
        description: 'Delete app key creation success',
        content: { 'application/json': { schema: { type: 'object' } } },
      },
    },
  })
  async deleteAppKey(
    @param.path.number('id') id: number,
  ): Promise<any> {
    await this.userRepository.updateById(id, { appKey: "" });
    return true;
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User update success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, { partial: true }),
        },
      },
    })
    user: Users,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User deletion success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    user.deleteDate = new Date();
    await this.userRepository.updateById(id, user);
  }

  @post('/users/change-password')
  async changePass(@requestBody() {email, currentPwd, newPwd }: { email: string, currentPwd: string, newPwd: string }): Promise<any> {

    const foundUser = await this.userRepository.findOne({ where: { email: email } });
    if (!foundUser) {
      throw new HttpErrors.NotFound('User not found');
    }

    const salt = await genSalt(10);
    foundUser.password = await hash(newPwd, salt);


    let res = this.userRepository.updateById(foundUser.id, foundUser);
    return {statusCode: 200 , data: res};
  }
}