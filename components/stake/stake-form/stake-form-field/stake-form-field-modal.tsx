import { Div, Img, P, Span } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { ASSET_METADATA } from '@/constants';
import { useCoins } from '@/hooks/use-coins';
import { useStakingObjects } from '@/hooks/use-staking-objects';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import { StakeFormFieldCoinProps } from './stake-form-field.types';

const StakeFormFieldModal: FC<StakeFormFieldCoinProps> = ({ name }) => {
  const { coins } = useCoins();
  const {
    // control,
    setValue,
  } = useFormContext();
  const { principalByType } = useStakingObjects();

  // const currentCoin = useWatch({ control, name: `${name}.coin` });

  console.log({ name });

  return (
    <Div
      p="1.5rem"
      gap="1.5rem"
      width="27rem"
      display="flex"
      color="#ffffff"
      borderRadius="1rem"
      flexDirection="column"
      backdropFilter="blur(30px)"
      bg="linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.10))"
    >
      <Div display="flex" justifyContent="space-between">
        <P fontSize="1.25rem" fontWeight="600">
          Select coin
        </P>
        <Span
          py="0.25rem"
          px="0.75rem"
          bg="#FFFFFF1A"
          display="flex"
          fontWeight="500"
          borderRadius="0.5rem"
        >
          ESC
        </Span>
      </Div>
      <Div display="flex" flexDirection="column" gap="1rem">
        {values(ASSET_METADATA).map(
          ({ symbol, type, decimals, name, kind, Icon }) => (
            <Div
              p="1rem"
              key={type}
              display="grid"
              borderRadius="1rem"
              border="1px solid #FFFFFF1A"
              gridTemplateColumns="3fr 1fr 1fr"
              nHover={{ borderColor: '#99EFE44D' }}
              onClick={() => {
                setValue('in.value', '0');
                setValue('out.value', '0');
                setValue(`${name}.value`, type);
              }}
            >
              <Div display="flex" gap="1rem">
                {typeof Icon === 'string' ? (
                  <Span display="flex" overflow="hidden" borderRadius="0.25rem">
                    <Img src={Icon} alt={symbol} maxWidth="2.5rem" />
                  </Span>
                ) : (
                  <Span display="flex" overflow="hidden" borderRadius="50%">
                    <Icon width="100%" maxWidth="2.5rem" />
                  </Span>
                )}

                <P>{name}</P>
              </Div>
              <Div>{kind}</Div>
              <Div textAlign="right">
                <P fontFamily="JetBrains Mono">
                  {
                    +FixedPointMath.toNumber(
                      principalByType?.[type] ?? BigNumber(coins?.[type] ?? 0),
                      decimals
                    ).toFixed(4)
                  }
                </P>
              </Div>
            </Div>
          )
        )}
      </Div>
    </Div>
  );
};

export default StakeFormFieldModal;
