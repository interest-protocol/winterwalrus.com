import { Div, Img, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { COIN_TYPES } from '@/constants';
import { formatDollars, formatMoney } from '@/utils';

import LSTNFTsButton from '../lst-nftsl-button';
import { LSTNFTsCoinsRowProps } from './lst-nftsl.types';

const LSTNFTsCoinsRow: FC<LSTNFTsCoinsRowProps> = ({
  id,
  objectId,
  coinType,
}) => {
  const form = useForm({
    defaultValues: {
      out: {
        type: COIN_TYPES[0],
        value: 0,
      },
    },
  });

  const metadataLoading = false;
  const metadata: Record<string, { iconUrl: string; symbol: string }> = {
    [coinType]: {
      iconUrl: 'https://via.placeholder.com/24',
      symbol: coinType.toUpperCase(),
    },
  };

  const metricsLoading = false;
  const metrics: Record<
    string,
    {
      totalStaked: number;
      toWithdraw: number;
      status:
        | 'Ready to Get'
        | 'Read to Withdraw'
        | 'Withdrawing'
        | 'staked'
        | '12:12';
    }
  > = {
    [objectId]: {
      totalStaked: 123456.78,
      toWithdraw: 0.045,
      status:
        id == '1'
          ? 'Ready to Get'
          : id == '2'
            ? 'Withdrawing'
            : id == '3'
              ? '12:12'
              : 'staked',
    },
  };

  const status = metrics?.[objectId]?.status;

  return (
    <Div
      p="1rem"
      display="grid"
      color="#ffffff"
      border="1px solid"
      fontSize="0.875rem"
      alignItems="center"
      borderColor="#FFFFFF1A"
      borderRadius="0.625rem"
      nHover={{ borderColor: '#99EFE44D' }}
      gridTemplateColumns="0.5fr repeat(4, 1fr)"
    >
      <Div display="flex" alignItems="center" gap="0.5rem">
        {metadataLoading ? (
          <Skeleton width="1.5rem" height="1.5rem" borderRadius="50%" />
        ) : (
          <Img
            width="1.5rem"
            height="1.5rem"
            borderRadius="50%"
            src={metadata?.[coinType]?.iconUrl}
            alt={metadata?.[coinType]?.symbol}
          />
        )}
        {metadataLoading ? (
          <Skeleton width="6rem" />
        ) : (
          <Div display="flex" flexDirection="column" gap="0.25rem">
            <Span whiteSpace="nowrap">Wal addr</Span>
            <Span whiteSpace="nowrap">StakedWal</Span>
          </Div>
        )}
      </Div>
      <Span whiteSpace="nowrap" textAlign="center">
        {metricsLoading ? (
          <Skeleton width="4rem" />
        ) : (
          <Span whiteSpace="nowrap">
            {metrics?.[objectId]
              ? formatMoney(Number(metrics[objectId].totalStaked))
              : '--'}
          </Span>
        )}
      </Span>
      <Span whiteSpace="nowrap" textAlign="center">
        {metricsLoading ? (
          <Skeleton width="4rem" />
        ) : (
          <Span whiteSpace="nowrap">
            {metrics?.[objectId]
              ? formatDollars(Number(metrics[objectId].toWithdraw))
              : '--'}
          </Span>
        )}
      </Span>
      <Div display="flex" justifyContent="center">
        {metricsLoading ? (
          <Skeleton width="4rem" />
        ) : (
          <Div
            whiteSpace="nowrap"
            background={
              status === 'Ready to Get'
                ? '#C484F614'
                : status === 'Withdrawing'
                  ? '#83F34E14'
                  : '#FFFFFF14'
            }
            color={
              status === 'Ready to Get'
                ? '#C484F6'
                : status === 'Withdrawing'
                  ? '#83F34E'
                  : '#FFFFFF'
            }
            px="0.75rem"
            py="0.25rem"
            mx="0.5rem"
            borderRadius="1rem"
            fontWeight="bold"
            textAlign="center"
          >
            {status === 'Ready to Get'
              ? 'Ready To Withdraw'
              : status === 'Withdrawing'
                ? 'Withdrawing'
                : status === 'staked'
                  ? 'Staked'
                  : status}
          </Div>
        )}
      </Div>

      <FormProvider {...form}>
        <LSTNFTsButton status={metrics?.[objectId]?.status} />
      </FormProvider>
    </Div>
  );
};

export default LSTNFTsCoinsRow;
