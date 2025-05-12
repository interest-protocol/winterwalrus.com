import { Div, Img, Span } from '@stylin.js/elements';
import { isNil } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import unikey from 'unikey';

import { CheckboxSVG } from '@/components/svg';
import useMetadata from '@/hooks/use-metadata';
import { useTabState } from '@/hooks/use-tab-manager';
import { formatMoney, ZERO_BIG_NUMBER } from '@/utils';

import { IPoolForm } from '../pool-form.types';

const PoolFormSummary: FC = () => {
  const { tab } = useTabState();
  const { control, setValue } = useFormContext<IPoolForm>();

  const [lpCoin, quoting, coins, selectedCoinIndex] = useWatch({
    control,
    name: ['pool', 'quoting', 'coins', 'selectedCoinIndex'],
  });

  const { data, isLoading } = useMetadata([
    lpCoin?.type,
    ...(coins?.map(({ type }) => type) ?? []),
  ]);

  if (tab === 0)
    return (
      <Div px="1rem" color="#FFFFFF">
        <Div
          gap="0.5rem"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Div display="flex" alignItems="center" gap="0.5rem">
            {isLoading ? (
              <Skeleton width="5rem" />
            ) : (
              <Img
                width="1.5rem"
                height="1.5rem"
                alt={data?.[lpCoin?.type]?.name}
                src={data?.[lpCoin?.type]?.iconUrl}
              />
            )}
            {isLoading ? (
              <Skeleton width="5rem" />
            ) : (
              <Span color="#FFFFFF">{data?.[lpCoin?.type]?.symbol}</Span>
            )}
          </Div>
          <Span fontFamily="JetBrains Mono">
            {quoting ? (
              <Skeleton width="5rem" />
            ) : (
              formatMoney(Number(lpCoin.value))
            )}
          </Span>
        </Div>
      </Div>
    );

  if (tab === 1)
    return (
      <Div
        px="1rem"
        gap="0.5rem"
        display="flex"
        color="#FFFFFF"
        flexDirection="column"
      >
        {coins.map(({ type, value }, index) => (
          <Div
            gap="0.5rem"
            key={unikey()}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Div display="flex" alignItems="center" gap="0.5rem">
              <Span
                cursor="pointer"
                onClick={() => {
                  setValue(
                    'selectedCoinIndex',
                    selectedCoinIndex === index ? undefined : index
                  );
                  coins.forEach((_, internalIndex) => {
                    setValue(`coins.${internalIndex}.value`, '0');
                    setValue(`coins.${internalIndex}.valueBN`, ZERO_BIG_NUMBER);
                  });
                }}
              >
                <CheckboxSVG
                  width="100%"
                  maxWidth="1rem"
                  status={
                    isNil(selectedCoinIndex)
                      ? 'active'
                      : selectedCoinIndex === index
                        ? 'checked'
                        : 'unchecked'
                  }
                />
              </Span>
              {isLoading ? (
                <Skeleton width="5rem" />
              ) : (
                <Img
                  width="1.5rem"
                  height="1.5rem"
                  borderRadius="50%"
                  alt={data?.[type]?.name}
                  src={data?.[type]?.iconUrl}
                />
              )}
              {isLoading ? (
                <Skeleton width="5rem" />
              ) : (
                <Span color="#FFFFFF">{data?.[type]?.symbol}</Span>
              )}
            </Div>
            <Span fontFamily="JetBrains Mono">
              {quoting ? <Skeleton width="5rem" /> : formatMoney(Number(value))}
            </Span>
          </Div>
        ))}
      </Div>
    );

  return null;
};

export default PoolFormSummary;
