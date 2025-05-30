import { Div } from '@stylin.js/elements';
import { FC } from 'react';

const PoolRowButton: FC = () => (
  <Div
    width="43px"
    height="42px"
    bg="#99EFE41A"
    display="flex"
    alignItems="center"
    justifyContent="center"
    borderRadius="0.625rem"
    border="1px solid #99EFE480"
  >
    <Div
      width="20px"
      height="20px"
      bg="#99EFE41A"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="0.375rem"
      border="1px solid #99EFE4"
    >
      +
    </Div>
  </Div>
);

export default PoolRowButton;
