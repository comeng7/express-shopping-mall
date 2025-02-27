import { Inject, Service } from 'typedi';
import { Repository, DataSource } from 'typeorm';

import { User } from '@/entities/User.entity';
import { TCreateUserDto, TUpdateUserDto } from '@/validators/user.validator';

@Service()
export class UserRepository {
  private repository: Repository<User>;

  constructor(@Inject() private dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  /**
   * 이메일로 유저 찾기
   * @param email - 유저 이메일
   * @returns User | null
   */
  async findByEmail(email: string) {
    return this.repository
      .createQueryBuilder('u')
      .where('u.email = :email', { email })
      .getOne();
  }

  /**
   * 유저 ID로 유저 찾기
   * @param userId - 유저 ID
   * @returns User | null
   */
  async findByUserId(userId: string) {
    return this.repository
      .createQueryBuilder('u')
      .where('u.userId = :userId', { userId })
      .getOne();
  }

  /**
   * 유저 고유 ID로 유저 찾기
   * @param id - 유저 고유 ID
   * @returns User | null
   */
  async findByUserNo(id: number) {
    return this.repository
      .createQueryBuilder('u')
      .where('u.id = :id', { id })
      .getOne();
  }

  /**
   * 유저 생성
   * @param TCreateUserDto - 유저 생성 데이터
   * @returns User
   */
  async createUser(userData: Omit<TCreateUserDto, 'confirmPassword'>) {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  async updateUser(userNo: number, updateData: TUpdateUserDto) {
    await this.repository.update({ id: userNo }, updateData);
    return this.findByUserNo(userNo);
  }
}
