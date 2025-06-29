import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) =>
  fetch(
    `https://swap.api.sui-prod.bluefin.io/api/v1/pools/info?pools=${req.query.pool}`
  )
    .then((res) => res.json())
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));

export default handler;
