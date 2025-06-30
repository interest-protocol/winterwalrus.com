import { Div, H3, Img, P } from '@stylin.js/elements';
import Link from 'next/link';
import { FC } from 'react';
import unikey from 'unikey';

import { ExternalLinkSVG } from '@/components/svg';
import useMetadata from '@/hooks/use-metadata';

import { DeFiItemProps } from './defi-item.types';
import DeFiItemMetric from './defi-item-cell';

const DeFiItem: FC<DeFiItemProps> = ({
  logo,
  link,
  title,
  assets,
  metrics,
}) => {
  const { data: metadata } = useMetadata(assets);

  return (
    <Link href={link} target={link.startsWith('/') ? undefined : '_blank'}>
      <Div
        p="1rem"
        gap="1rem"
        bg="#FFFFFF0D"
        display="flex"
        borderRadius="1rem"
        flexDirection="column"
        border="1px solid #FFFFFF1A"
        nHover={{ borderColor: '#99EFE466' }}
      >
        <Div
          gap="0.5rem"
          display="flex"
          color="#FFFFFF"
          alignItems="center"
          justifyContent="space-between"
        >
          <Div display="flex" gap="0.5rem" alignItems="center" color="#FFFFFF">
            {logo}
            <H3 fontSize="1.125rem">{title}</H3>
          </Div>
          <ExternalLinkSVG maxWidth="1rem" width="100%" />
        </Div>
        <Div
          gap="0.5rem"
          display="grid"
          gridTemplateColumns={`repeat(${metrics.length + 1}, 1fr)`}
        >
          <Div
            p="1rem"
            display="flex"
            key={unikey()}
            alignItems="center"
            fontSize="0.875rem  "
            borderRadius="0.63rem"
            flexDirection="column"
            border="1px solid #FFFFFF1A"
          >
            <Div color="#FFFFFF">
              {metadata ? (
                <Div display="flex" gap="0.5rem">
                  <Div display="flex">
                    {assets.map((type, index) => (
                      <Img
                        key={type}
                        maxWidth="1rem"
                        maxHeight="1rem"
                        borderRadius="50%"
                        alt={metadata[type].name}
                        ml={index ? '-0.5rem' : '0'}
                        src={metadata[type].iconUrl}
                      />
                    ))}
                  </Div>
                  <P fontFamily="JetBrains Mono">
                    {assets.map((type) => metadata[type].symbol).join('-')}
                  </P>
                </Div>
              ) : (
                '-'
              )}
            </Div>
            <Div color="#FFFFFF80">Assets</Div>
          </Div>
          {metrics.map((metric) => (
            <DeFiItemMetric key={unikey()} {...metric} />
          ))}
        </Div>
      </Div>
    </Link>
  );
};

export default DeFiItem;
