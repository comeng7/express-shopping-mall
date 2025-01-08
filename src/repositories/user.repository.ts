import { Service } from 'typedi';

interface UserEntity {
  id: number;
  name: string;
  email: string;
  postCode?: string;
  address?: string;
  password: string;
  userId: string;
  createdAt: Date;
}

// 임시 목데이터
const usersMockData: UserEntity[] = [
  {
    id: 1,
    name: '홍길동',
    email: 'hong@example.com',
    postCode: '12345',
    address: '서울시 강남구',
    password: '$2b$10$abcdef...', // 해시된 비밀번호 예시
    userId: 'hong123',
    createdAt: new Date(),
  },
  {
    id: 2,
    name: '김철수',
    email: 'kim@example.com',
    postCode: '67890',
    address: '부산시 해운대구',
    password: '$2b$10$ghijkl...', // 해시된 비밀번호 예시
    userId: 'kim456',
    createdAt: new Date(),
  },
  // 추가 목데이터 필요 시 추가
];

@Service()
export class UserRepository {
  private users: UserEntity[] = usersMockData;

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findByUserId(userId: string): Promise<UserEntity | undefined> {
    return this.users.find((user) => user.userId === userId);
  }

  async findById(id: number): Promise<UserEntity | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async createUser(userData: Omit<UserEntity, 'id' | 'createdAt'>): Promise<UserEntity> {
    const newId = this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
    const newUser: UserEntity = {
      id: newId,
      createdAt: new Date(),
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }
}
