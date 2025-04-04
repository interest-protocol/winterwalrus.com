import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Stats: NextPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    push(
      'https://app.sentio.xyz/interest-labs/winter-walrus-prd-dashboard/dashboards/mFeFgtIC'
    );
  }, []);

  return null;
};

export default Stats;
