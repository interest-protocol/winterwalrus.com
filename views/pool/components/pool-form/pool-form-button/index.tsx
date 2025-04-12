import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import WalletGuardButton from '@/components/wallet-button/wallet-guard-button';
import { useTabState } from '@/hooks/use-tab-manager';

import { IPoolForm } from '../pool-form.types';
import { useLiquidity } from './pool-form-button.hooks';

const PoolFormButton: FC = () => {
  const { tab } = useTabState();
  const { control } = useFormContext<IPoolForm>();
  const quoting = useWatch({ control, name: 'quoting' });
  const { addLiquidity, removeLiquidity } = useLiquidity();

  const disabled = quoting;

  return (
    <WalletGuardButton
      all="unset"
      py="1rem"
      px="1.5rem"
      opacity={1}
      bg="#99EFE4"
      color="#0C0F1D"
      cursor="pointer"
      fontWeight="500"
      textAlign="center"
      position="relative"
      disabled={disabled}
      borderRadius="0.625rem"
      onClick={() => !disabled && (tab ? removeLiquidity() : addLiquidity())}
    >
      {quoting ? 'Quoting...' : tab ? 'Withdraw' : 'Deposit'}
    </WalletGuardButton>
  );
};

export default PoolFormButton;
