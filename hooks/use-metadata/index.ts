import useSWR from 'swr';

import { ASSET_METADATA } from '@/constants';
import { AssetMetadata } from '@/interface';

const useMetadata = (types: ReadonlyArray<string>) =>
  useSWR<Record<string, AssetMetadata>>([useMetadata.name, types], async () => {
    if (!types || !types.length) throw new Error('Types empty');

    const localMetadata = types.reduce(
      (acc, type) =>
        ASSET_METADATA[type] ? { ...acc, [type]: ASSET_METADATA[type] } : acc,
      {}
    );

    const missingTypes = types.filter((type) => !ASSET_METADATA[type]);

    const missingMetadata = missingTypes.length
      ? await fetch(
          `https://api.interestlabs.io/v1/coins/mainnet/metadatas?coinTypes=${missingTypes}`
        )
          .then((res) => res.json())
          .then((data: ReadonlyArray<AssetMetadata>) =>
            data.reduce((acc, item) => ({ ...acc, [item.type]: item }), {})
          )
      : [];

    return {
      ...localMetadata,
      ...missingMetadata,
    };
  });

export default useMetadata;
