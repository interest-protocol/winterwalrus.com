import { Div, P, Span } from '@stylin.js/elements';
import { FC } from 'react';

const StakeFormFieldModal: FC = () => {
  return (
    <Div
      p="1.5rem"
      width="27rem"
      color="#ffffff"
      borderRadius="1rem"
      backdropFilter="blur(20px)"
      bg="rgba(255, 255, 255, 0.10)"
    >
      <Div display="flex" justifyContent="space-between">
        <P fontSize="1.25rem" fontWeight="600">
          Select coin
        </P>
        <Span
          py="0.25rem"
          px="0.75rem"
          bg="#FFFFFF1A"
          display="flex"
          fontWeight="500"
          borderRadius="0.5rem"
        >
          ESC
        </Span>
      </Div>
      <Div display="flex" flexDirection="column"></Div>
    </Div>
  );
};

export default StakeFormFieldModal;
