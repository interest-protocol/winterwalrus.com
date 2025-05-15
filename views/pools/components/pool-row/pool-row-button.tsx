import { Div } from '@stylin.js/elements';
import { FC } from 'react';

const PoolRowButton: FC = () => (
  <Div
    width="43px"
    height="42px"
    bg="#EE2B5B1A"
    display="flex"
    alignItems="center"
    justifyContent="center"
    borderRadius="0.625rem"
    border="1px solid #EE2B5B80"
  >
    <Div
      width="20px"
      height="20px"
      bg="#EE2B5B1A"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="0.375rem"
      border="1px solid #EE2B5B"
    >
      +
    </Div>
  </Div>
);

export default PoolRowButton;
