import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Inject, Service } from 'typedi';

import { BaseError } from '@/errors';
import { UserRepository } from '@/repositories/user.repository';

@Service()
export class UserService {
  constructor(@Inject() private readonly userRepository: UserRepository) {}

  /**
   * 회원가입
   */
  async createUser(params: {
    name: string;
    email: string;
    postCode?: string;
    address?: string;
    password: string;
    userId: string;
  }) {
    const existingUser = await this.userRepository.findByEmail(params.email);
    if (existingUser) {
      throw new BaseError(409, '이미 존재하는 이메일입니다.', 'USER_ALREADY_EXISTS');
    }

    const existingUserId = await this.userRepository.findByUserId(params.userId);
    if (existingUserId) {
      throw new BaseError(409, '이미 존재하는 사용자 ID입니다.', 'USER_ID_ALREADY_EXISTS');
    }

    const hashedPassword = await bcrypt.hash(params.password, 10);

    const newUser = await this.userRepository.createUser({
      name: params.name,
      email: params.email,
      postCode: params.postCode,
      address: params.address,
      password: hashedPassword,
      userId: params.userId,
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      postCode: newUser.postCode,
      address: newUser.address,
      userId: newUser.userId,
      createdAt: newUser.createdAt,
    };
  }

  /**
   * 로그인
   */
  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BaseError(404, '존재하지 않는 이메일입니다.', 'USER_NOT_FOUND');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BaseError(400, '비밀번호가 일치하지 않습니다.', 'INVALID_PASSWORD');
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'secret', // 환경변수로 대체 필요
      { expiresIn: '1h' },
    );

    return { token };
  }

  /**
   * 유저 정보 조회
   */
  async getUserById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new BaseError(404, '유저가 존재하지 않습니다.', 'USER_NOT_FOUND');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      postCode: user.postCode,
      address: user.address,
      userId: user.userId,
      createdAt: user.createdAt,
    };
  }
}
