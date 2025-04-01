import { Div } from '@stylin.js/elements';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { COIN_TYPES, LST_TYPES_MAP } from '@/constants';

import UnstakeDetails from './unstake-details';
import UnstakeForm from './unstake-form';

const Unstake: FC = () => {
  const { query } = useRouter();
  const lst = String(query.lst).toUpperCase();
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    const [inType, outType] = getValues(['in.type', 'out.type']);

    if (COIN_TYPES[0] === outType) return;

    setValue('in', { type: outType || LST_TYPES_MAP[lst], value: '0' });
    setValue('out', { type: inType || COIN_TYPES[0], value: '0' });
  }, []);

  return (
    <Div gap="1rem" display="flex" flexDirection="column">
      <UnstakeForm />
      <UnstakeDetails />
    </Div>
  );
};

export default Unstake;
