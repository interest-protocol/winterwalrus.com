import { TYPES } from '@interest-protocol/blizzard-sdk';
import { normalizeStructTag } from '@mysten/sui/utils';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (_, response) => {
  try {
    const data = await fetch(
      'https://endpoint.sentio.xyz/interest-labs/winter-walrus-mainnet-metrics/metrics',
      {
        method: 'POST',
        headers: { 'api-key': process.env.SENTIO_API_KEY ?? '' },
        body: JSON.stringify({ lst: TYPES.WWAL }),
      }
    ).then((res) => res.json());

    if (!data.syncSqlResponse.result.rows) throw data;

    const result = data.syncSqlResponse.result.rows.reduce(
      (acc: Record<string, unknown>, row: Record<string, string | number>) => ({
        ...acc,
        [normalizeStructTag(row.lst as string)]: row,
      }),
      {} as Record<string, Record<string, number>>
    );

    response.status(200).json(result);
  } catch (e) {
    response.status(500).json({
      code: 500,
      name: (e as Error).name,
      cause: (e as Error).cause,
      stack: (e as Error).stack,
      message: (e as Error).message,
    });
  }
};

export default handler;
