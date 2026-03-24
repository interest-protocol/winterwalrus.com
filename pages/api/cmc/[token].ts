import { NextApiHandler } from 'next';

const TOKEN_TO_COIN_GECKO = {
  sui: 'sui',
  walrus: 'walrus-2',
} as const;

type TokenName = keyof typeof TOKEN_TO_COIN_GECKO;

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' });

  const token = String(req.query.token).toLowerCase() as TokenName;
  const coinGeckoId = TOKEN_TO_COIN_GECKO[token];

  if (!coinGeckoId)
    return res.status(400).json({ message: 'Unsupported token' });

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoId}&vs_currencies=usd`
    );

    const payload = await response.json();

    console.log({ payload });

    if (!response.ok) return res.status(response.status).json(payload);

    const price = payload[String(coinGeckoId)].usd;

    if (typeof price !== 'number')
      return res.status(502).json({ message: 'Invalid CMC response' });

    res.setHeader(
      'Cache-Control',
      'public, max-age=3600, s-maxage=3600, stale-while-revalidate=300'
    );

    return res.status(200).json({ price });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch token price from CMC',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export default handler;
