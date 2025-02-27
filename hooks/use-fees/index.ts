import { SHARED_OBJECTS } from '@interest-protocol/blizzard-sdk';
import useSWR from 'swr';

import useBlizzardSdk from '../use-blizzard-sdk';
import { useNetwork } from '../use-network';

export const useFees = () => {
  const network = useNetwork();
  const blizzardSdk = useBlizzardSdk();

  const { data: fees, ...rest } = useSWR([useFees.name], async () => {
    const fees = await blizzardSdk.getFees(
      SHARED_OBJECTS[network].SNOW_STAKING({ mutable: false }).objectId
    );

    return {
      staking: +fees.mint / 100,
      transmute: +fees.transmute / 100,
      unstaking: +fees.burn > 100 ? +fees.burn / 100 : 1,
    };
  });

  return {
    ...rest,
    fees,
  };
};
