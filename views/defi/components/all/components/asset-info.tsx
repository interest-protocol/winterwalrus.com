import { Div, P } from '@stylin.js/elements';
import type { FC } from 'react';

interface AssetInfoProps {
  asset: string;
}

const AssetInfo: FC<AssetInfoProps> = ({ asset }) => {
  return (
    <Div
      p="0.75rem"
      display="flex"
      bg="#1A1A1A"
      borderRadius="0.5rem"
      flexDirection="column"
      gap="0.25rem"
      justifyContent="center"
      alignItems="center"
    >
      <Div
        display="flex"
        alignItems="center"
        gap="0.25rem"
        justifyContent="center"
      >
        <Div
          width="1rem"
          height="1rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
          bg="#3366FF"
          color="#FFFFFF"
          fontSize="0.5rem"
        >
          W
        </Div>
        <P color="#FFFFFF" fontSize="0.75rem" fontWeight="500">
          {asset}
        </P>
      </Div>
      <P color="#FFFFFF80" fontSize="0.75rem">
        Assets
      </P>
    </Div>
  );
};

export default AssetInfo;
