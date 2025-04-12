import BigNumber from 'bignumber.js';

export interface IPoolForm {
  quoting: boolean;
  selectedCoinIndex?: number;
  pool: { id: string; type: string; value: string; valueBN: BigNumber };
  coins: ReadonlyArray<{
    type: string;
    value: string;
    valueBN: BigNumber;
  }>;
}
