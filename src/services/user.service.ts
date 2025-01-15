import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Inject, Service } from 'typedi';

import { BaseError } from '@/errors';
import { UserRepository } from '@/repositories/user.repository';
import { TCreateUserDto, TLoginDto } from '@/validators/user.validator';

@Service()
export class UserService {
  constructor(@Inject() private readonly userRepository: UserRepository) {}

  /**
   * 회원가입
   */
  async createUser(data: TCreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new BaseError(
        409,
        '이미 존재하는 이메일입니다.',
        'USER_ALREADY_EXISTS',
      );
    }

    const existingUserId = await this.userRepository.findByUserId(data.userId);
    if (existingUserId) {
      throw new BaseError(
        409,
        '이미 존재하는 유저입니다.',
        'USER_ID_ALREADY_EXISTS',
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.userRepository.createUser({
      name: data.name,
      email: data.email,
      postCode: data.postCode,
      phoneNumber: data.phoneNumber,
      address: data.address,
      password: hashedPassword,
      userId: data.userId,
    });

    return {
      name: newUser.name,
      email: newUser.email,
      phoneNumber: data.phoneNumber,
      postCode: newUser.postCode,
      address: newUser.address,
      userId: newUser.userId,
    };
  }

  /**
   * 로그인
   */
  async login(data: TLoginDto) {
    const user = await this.userRepository.findByUserId(data.userId);
    if (!user) {
      throw new BaseError(404, '존재하지 않는 유저입니다.', 'USER_NOT_FOUND');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new BaseError(
        400,
        '비밀번호가 일치하지 않습니다.',
        'INVALID_PASSWORD',
      );
    }

    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET ?? 'secret',
      { expiresIn: '12h' },
    );

    return { token };
  }

  /**
   * 유저 정보 조회
   */
  async getUserByUserId(userId: string) {
    const user = await this.userRepository.findByUserId(userId);
    if (!user) {
      throw new BaseError(404, '유저가 존재하지 않습니다.', 'USER_NOT_FOUND');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      postCode: user.postCode,
      address: user.address,
      userId: user.userId,
      createdAt: user.createdAt,
    };
  }
}
