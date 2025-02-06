import { H1, Strong } from '@stylin.js/elements';
import { FC } from 'react';

const Hero: FC = () => (
  <H1
    mx="auto"
    mt="2.5rem"
    color="#FFFFFF"
    maxWidth="20rem"
    textAlign="center"
    fontSize="4rem"
    fontFamily="PPNeueBit"
  >
    <Strong color="#99EFE4" fontFamily="PPNeueBit">
      Winter
    </Strong>{' '}
    Walrus
  </H1>
);

export default Hero;
