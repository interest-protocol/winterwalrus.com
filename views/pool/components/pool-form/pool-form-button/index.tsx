import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import WalletGuardButton from '@/components/wallet-button/wallet-guard-button';
import { useCoins } from '@/hooks/use-coins';
import { useTabState } from '@/hooks/use-tab-manager';
import { ZERO_BIG_NUMBER } from '@/utils';

import { IPoolForm } from '../pool-form.types';
import { useLiquidity } from './pool-form-button.hooks';

const PoolFormButton: FC = () => {
  const { coins } = useCoins();
  const { tab } = useTabState();
  const { control } = useFormContext<IPoolForm>();
  const quoting = useWatch({ control, name: 'quoting' });
  const { addLiquidity, removeLiquidity, loading } = useLiquidity();

  const [pool, tokens] = useWatch({ control, name: ['pool', 'coins'] });

  const emptyFields = tab
    ? !pool.value || pool.valueBN.isZero()
    : tokens?.every(({ valueBN, value }) => !value || valueBN.isZero());

  const insufficientBalance = tab
    ? pool.valueBN.gt(coins?.[pool.type] ?? ZERO_BIG_NUMBER)
    : tokens?.some(({ type, valueBN }) =>
        valueBN.gt(coins?.[type] ?? ZERO_BIG_NUMBER)
      );

  const disabled = quoting || insufficientBalance || emptyFields || loading;

  return (
    <WalletGuardButton
      all="unset"
      py="1rem"
      px="1.5rem"
      color="#0C0F1D"
      fontWeight="500"
      textAlign="center"
      position="relative"
      disabled={disabled}
      borderRadius="0.625rem"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      bg={insufficientBalance ? '#FF898B' : disabled ? '#99EFE480' : '#EE2B5B'}
      nHover={
        !disabled && {
          bg: '#74D5C9',
        }
      }
      onClick={() => !disabled && (tab ? removeLiquidity() : addLiquidity())}
    >
      {emptyFields
        ? 'Insert an amount'
        : quoting
          ? 'Quoting...'
          : tab === 0
            ? loading
              ? 'Depositing...'
              : 'Deposit'
            : tab === 1
              ? loading
                ? 'Withdrawing...'
                : 'Withdraw'
              : loading
                ? 'Swapping...'
                : 'Swap'}
    </WalletGuardButton>
  );
};

export default PoolFormButton;
