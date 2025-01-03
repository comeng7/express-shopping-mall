import { BaseError } from './base.error';

export class DatabaseError extends BaseError {
  constructor(message: string, code = 'DATABASE_ERROR') {
    super(500, message, code);
  }

  static Connection = () => new DatabaseError('데이터베이스 연결에 실패했습니다.', 'DB_CONNECTION_ERROR');

  static Query = (details: string) => new DatabaseError(`쿼리 실행 중 오류가 발생했습니다: ${details}`, 'DB_QUERY_ERROR');
}
