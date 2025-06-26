import { Div, H3 } from '@stylin.js/elements';
import { FC } from 'react';

const METRICS = [{}, {}, {}];

const DeFiItem: FC = () => (
  <Div
    p="1rem"
    gap="1rem"
    bg="#FFFFFF0D"
    display="flex"
    borderRadius="1rem"
    flexDirection="column"
    border="1px solid #FFFFFF1A"
  >
    <Div display="flex" gap="0.5rem" alignItems="center" color="#FFFFFF">
      <Div bg="blue" width="1rem" height="1rem" borderRadius="50%" />
      <H3 fontSize="1.125rem">Lend on Nemo</H3>
    </Div>
    <Div
      gap="0.5rem"
      display="grid"
      gridTemplateColumns={`repeat(${METRICS.length}, 1fr)`}
    >
      {METRICS.map((_, index) => (
        <Div
          p="1rem"
          key={index}
          display="flex"
          alignItems="center"
          fontSize="0.875rem  "
          borderRadius="0.63rem"
          flexDirection="column"
          border="1px solid #FFFFFF1A"
        >
          <Div color="#FFFFFF">{index}</Div>
          <Div color="#FFFFFF80">{index}</Div>
        </Div>
      ))}
    </Div>
  </Div>
);

export default DeFiItem;
