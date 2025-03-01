import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Button, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { WalletSVG } from '@/components/svg';
import { useAppState } from '@/hooks/use-app-state';
import useEpochData from '@/hooks/use-epoch-data';
import { useNetwork } from '@/hooks/use-network';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import { StakeFormFieldGenericProps } from './stake-form-field.types';

const StakeFormFieldBalance: FC<StakeFormFieldGenericProps> = ({ name }) => {
  const network = useNetwork();
  const { balances } = useAppState();
  const { data: epoch } = useEpochData();
  const { control, setValue } = useFormContext();

  const type = useWatch({ control, name: `${name}.type` }) as string;

  const isSnowOutAfterVote =
    name === 'out' &&
    epoch &&
    epoch.msUntilNextEpoch / epoch.epochDurationMs < 0.5 &&
    type === TYPES[network].SNOW;

  const balance =
    balances[isSnowOutAfterVote ? TYPES[network].BLIZZARD_STAKE_NFT : type];

  return (
    <Button
      all="unset"
      gap="0.5rem"
      display="flex"
      cursor="pointer"
      {...(name === 'in' && {
        nHover: { color: '#99EFE4' },
        onClick: () =>
          setValue(
            `${name}.value`,
            FixedPointMath.toNumber(balance ?? ZERO_BIG_NUMBER)
          ),
      })}
    >
      <WalletSVG maxWidth="1rem" width="100%" />
      <Span fontFamily="JetBrains Mono">
        {FixedPointMath.toNumber(balance ?? ZERO_BIG_NUMBER, 9, 4)}
      </Span>
    </Button>
  );
};

export default StakeFormFieldBalance;
