import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다.'),
    email: z.string().email(),
    postCode: z.string().length(5, '우편번호는 5자리여야 합니다.').optional(),
    address: z.string().optional(),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(/[0-9]/, '숫자가 포함되어야 합니다.')
      .regex(/[a-zA-Z]/, '영문자가 포함되어야 합니다.')
      .regex(/[^a-zA-Z0-9]/, '특수문자가 포함되어야 합니다.'),
    confirmPassword: z.string(),
    userId: z.string().min(2, '아이디는 최소 2자 이상이어야 합니다.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().email({ message: '유효한 이메일 주소가 아닙니다.' }),
  password: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
});
