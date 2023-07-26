import { inject } from '@loopback/core';
import { compare, hash } from 'bcryptjs';
import { UserRepository } from '../repositories';
import { Users } from '../models';
import { HttpErrors } from '@loopback/rest';

export class UserService {
  constructor(
    @inject('repositories.UserRepository')
    public userRepository: UserRepository,
  ) { }

  async createUser(user: Users): Promise<Users> {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      throw new HttpErrors.BadRequest('Email already exists');
    }

    user.password = await hash(user.password, 10);

    return this.userRepository.create(user);
  }

  async verifyCredentials(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email,} });

    if (!user) {
      let res = { statusCode: 301, message: 'User not found' };
      return res;
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      let res = { statusCode: 302, message: 'Incorrect password' };
      return res;
    }

    return { statusCode: 302, data: user };
  }

  async resetPassword(email: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpErrors.NotFound('User not found');
    }

    user.password = await hash(newPassword, 10);

    await this.userRepository.updateById(user.id, user);
  }
}