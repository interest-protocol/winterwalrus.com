/* eslint-disable @typescript-eslint/no-explicit-any */
import BigNumber from 'bignumber.js';

import { BigNumberish } from '@/interface';

export function isHexString(value: any, length?: number): boolean {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  if (length && value.length !== 2 + 2 * length) {
    return false;
  }
  return true;
}

export const parseBigNumberish = (x: any): BigNumber =>
  isBigNumberish(x) ? new BigNumber(x.toString()) : ZERO_BIG_NUMBER;

export const parseToPositiveStringNumber = (x: string): string => {
  if (isNaN(+x)) return '0';
  if (0 > +x) return '0';
  return x;
};

export const ZERO_BIG_NUMBER = new BigNumber(0);

export function isBigNumberish(value: any): value is BigNumberish {
  return (
    value != null &&
    (BigNumber.isBigNumber(value) ||
      (typeof value === 'number' && value % 1 === 0) ||
      (typeof value === 'string' && !!value.match(/^-?[0-9]+$/)) ||
      isHexString(value) ||
      typeof value === 'bigint')
  );
}

export const isNumeric = (bn: BigNumber) => !Number.isNaN(bn.toNumber());
