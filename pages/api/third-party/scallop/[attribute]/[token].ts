import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const token = String(req.query.token);
  const attribute = String(req.query.attribute);

  const markets = await fetch('https://sdk.api.scallop.io/api/market/migrate')
    .then((res) => res.json())
    .then((data) => data.pools);

  const market = markets.find(
    ({ coinName }: { coinName: string }) => coinName === token
  );

  if (!market[attribute]) return res.status(404).send('Market pool not found');

  res.status(200).json(market[attribute]);
};

export default handler;
