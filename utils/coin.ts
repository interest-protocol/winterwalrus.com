import { TransactionResult } from '@mysten/sui/transactions';
import { normalizeStructTag } from '@mysten/sui/utils';

import { GetCoinOfValueArgs } from './utils.types';

export async function getCoinOfValue({
  tx,
  client,
  account,
  coinType,
  coinValue,
}: GetCoinOfValueArgs): Promise<TransactionResult> {
  if (normalizeStructTag(coinType) === normalizeStructTag('0x2::sui::SUI'))
    return tx.splitCoins(tx.gas, [tx.pure.u64(coinValue)]);

  const paginatedCoins = await client.getCoins({ coinType, owner: account });

  const [firstCoin, ...otherCoins] = paginatedCoins.data;

  const firstCoinInput = tx.object(firstCoin.coinObjectId);

  if (otherCoins.length > 0)
    tx.mergeCoins(
      firstCoinInput,
      otherCoins.map((coin) => coin.coinObjectId)
    );

  return tx.splitCoins(firstCoinInput, [tx.pure.u64(coinValue)]);
}
