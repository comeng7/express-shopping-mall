import { TCategoryCode } from '@/types/category.types';

export const CATEGORY_NAMES: Record<TCategoryCode, string> = {
  TWIN_BAG: 'TWIN BAG',
  REMOOD_BAG: 'REMOOD BAG',
  CLO_BAG: 'CLO BAG',
  MINIMAL_BAG: 'MINIMAL BAG',
  ACCESSORY: 'ACCESSORY',
};

export const CATEGORY_CODE = {
  TWIN_BAG: 'TWIN_BAG',
  REMOOD_BAG: 'REMOOD_BAG',
  CLO_BAG: 'CLO_BAG',
  MINIMAL_BAG: 'MINIMAL_BAG',
  ACCESSORY: 'ACCESSORY',
} as const;
