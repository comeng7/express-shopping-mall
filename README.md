# express-shopping-mall

쇼핑몰 백엔드 API 서버입니다.  
Express와 TypeScript를 기반으로 제작되었으며, 레이어드 아키텍처 패턴을 따릅니다.

## 기술 스택

- **Framework**: Express.js with TypeScript
- **Database**: MySQL (AWS RDS)
- **ORM**: TypeORM
- **Validation**: Zod, class-validator
- **DI Container**: TypeDI
- **API Documentation**: Swagger
- **Testing**: Jest, Supertest

## API 문서

- Swagger UI: http://43.201.96.112/api-docs/

## 프로젝트 구조

```
src/
├── config/                # 환경 설정 관련 파일
├── controllers/          # 요청/응답 처리 로직
├── services/             # 비즈니스 로직
├── repositories/         # 데이터베이스 접근 로직
├── entities/             # TypeORM 엔티티 정의
├── interfaces/           # 타입 정의
├── middlewares/          # 미들웨어
├── routes/               # 라우트 정의
├── validators/           # Zod 스키마 정의
├── utils/                # 유틸리티 함수
├── errors/               # 커스텀 에러 클래스
├── test/                 # 테스트
├── types/                # 타입 정의
└── app.ts                # 앱 진입점
```

## 아키텍처 레이어

### Presentation Layer (Controller)

- HTTP 요청/응답 처리
- 입력값 유효성 검증
- 요청 데이터를 서비스 레이어에 전달
- 응답 형식 표준화
- Swagger 문서 작성

### Service Layer

- 비즈니스 로직 구현
- 트랜잭션 관리
- 여러 레포지토리 조합
- 도메인 규칙 적용
- 예외 처리

### Repository Layer

- 데이터베이스 접근 로직
- TypeORM 쿼리 작성
- 엔티티 CRUD 작업
- 데이터 영속성 관리

### Domain Layer (Entity)

- 비즈니스 엔티티 정의
- 도메인 규칙과 제약조건
- TypeORM 엔티티 매핑
- 엔티티 간 관계 정의

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev:mock

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 테스트 실행
npm test
```

## 테스트

- 단위 테스트: `npm run test:unit`
- 통합 테스트: `npm run test:integration`
- 전체 테스트: `npm test`

## 라이센스

MIT License
