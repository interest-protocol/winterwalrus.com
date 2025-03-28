import { Div } from '@stylin.js/elements';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { COIN_LIST } from '@/constants';

import UnstakeDetails from './unstake-details';
import UnstakeForm from './unstake-form';

const Unstake: FC = () => {
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    const [inType, outType] = getValues(['in.type', 'out.type']);

    if (COIN_LIST[0].type === outType) return;

    setValue('in', { type: outType, value: '0' });
    setValue('out', { type: inType, value: '0' });
  }, []);

  return (
    <Div gap="1rem" display="flex" flexDirection="column">
      <UnstakeForm />
      <UnstakeDetails />
    </Div>
  );
};

export default Unstake;
