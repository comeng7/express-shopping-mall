import { CATEGORY_CODE } from '@/constants/category.constants';

export type TCategoryCode = (typeof CATEGORY_CODE)[keyof typeof CATEGORY_CODE];
