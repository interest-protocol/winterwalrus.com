import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) =>
  fetch(`https://api.noodles.fi/api/v1/token/detail?ident=${req.query.token}`)
    .then((res) => res.json())
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));

export default handler;
