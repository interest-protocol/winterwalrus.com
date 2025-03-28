import { SHARED_OBJECTS } from '@interest-protocol/blizzard-sdk';
import useSWR from 'swr';

import useBlizzardSdk from '../use-blizzard-sdk';

export const useFees = () => {
  const blizzardSdk = useBlizzardSdk();

  const { data: fees, ...rest } = useSWR([useFees.name], async () => {
    const fees = await blizzardSdk.getFees(
      SHARED_OBJECTS.WWAL_STAKING({ mutable: false }).objectId
    );

    return {
      staking: +fees.mint / 100,
      unstaking: +fees.burn / 100,
      transmute: +fees.transmute / 100,
    };
  });

  return {
    ...rest,
    fees,
  };
};
