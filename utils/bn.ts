/* eslint-disable @typescript-eslint/no-explicit-any */
import { MAX_BPS } from '@interest-protocol/blizzard-sdk';
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

/**
 * @name bpsCalcUp
 * @description this is the function that takes the fees based on @interest/bps package
 * @link https://github.com/interest-protocol/interest-mvr/blob/a2ed0e88d7b993a014c73061d7b369cc45c45624/bps/sources/bps.move#L57
 */
export const feesCalcUp = (
  feeBps: number,
  amount: BigNumber
): [BigNumber, BigNumber] => {
  const [fee, value, maxBps] = [
    BigInt(feeBps),
    BigInt(String(amount.decimalPlaces(0, 1))),
    MAX_BPS,
  ];

  const fees =
    (fee * value) / maxBps + BigInt((fee * value) % maxBps > BigInt(0) ? 1 : 0);

  return [BigNumber(String(value - fees)), BigNumber(String(fees))];
};
