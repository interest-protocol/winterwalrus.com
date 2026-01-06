import useSWR from 'swr';

import { ASSET_METADATA, LST_ICON_MAP } from '@/constants';
import { AssetMetadata } from '@/interface';

const useMetadata = (rawTypes: ReadonlyArray<string>) =>
  useSWR<Record<string, AssetMetadata>>(
    [useMetadata.name, rawTypes],
    async () => {
      const types = rawTypes.filter((type) => type);

      if (!types || !types.length) throw new Error('Types empty');

      const localMetadata = types.reduce(
        (acc, type) =>
          ASSET_METADATA[type] ? { ...acc, [type]: ASSET_METADATA[type] } : acc,
        {}
      );

      const missingTypes = types.filter((type) => !ASSET_METADATA[type]);

      const missingMetadata = missingTypes.length
        ? await fetch(
            `https://coin-metadata-api-production.up.railway.app/api/v1/fetch-coins?coinTypes=${missingTypes}`
          )
            .then((res) => res.json())
            .then((data: ReadonlyArray<AssetMetadata>) =>
              data.reduce(
                (acc, item) => ({
                  ...acc,
                  [item.type]: {
                    ...item,
                    iconUrl: LST_ICON_MAP[item.type] ?? item.iconUrl,
                  },
                }),
                {}
              )
            )
        : [];

      return {
        ...localMetadata,
        ...missingMetadata,
      };
    }
  );

export default useMetadata;
