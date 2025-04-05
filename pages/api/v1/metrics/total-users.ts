import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (_, response) => {
  try {
    const data = await fetch(
      'https://endpoint.sentio.xyz/interest-labs/winter-walrus-mainnet-metrics/total-users',
      {
        method: 'POST',
        body: JSON.stringify({}),
        headers: { 'api-key': process.env.SENTIO_API_KEY ?? '' },
      }
    ).then((res) => res.json());

    if (data.code) throw new Error(data.message, data);

    const result = data.syncSqlResponse.result.rows[0].total_users;

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
