import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';
import unikey from 'unikey';

import { DeFiMetric } from './defi-item.types';

const DeFiItemMetric: FC<DeFiMetric> = ({ value, name }) => {
  const { data, isLoading } = useSWR([name, value], () => value);

  return (
    <Div
      p="1rem"
      display="flex"
      key={unikey()}
      alignItems="center"
      fontSize="0.875rem  "
      borderRadius="0.63rem"
      flexDirection="column"
      border="1px solid #FFFFFF1A"
    >
      <Div color="#FFFFFF">{isLoading ? <Skeleton width="2rem" /> : data}</Div>
      <Div color="#FFFFFF80">{name}</Div>
    </Div>
  );
};

export default DeFiItemMetric;
