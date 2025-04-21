import { Div, H2, P } from '@stylin.js/elements';

const LiquidityPools = () => {
  return (
    <Div
      p="1rem"
      gap="1rem"
      bg="#FFFFFF0D"
      border="1px solid"
      borderRadius="1rem"
      display="flex"
      flexDirection="column"
    >
      <H2 fontWeight="600" fontSize="1rem" color="#FFFFFF">
        Liquidity Pools
      </H2>
      <Div
        gap="1rem"
        display="grid"
        gridTemplateColumns={['1fr', '1fr 1fr', '1fr']}
      >
        <Div
          p="1.5rem"
          gap="0.25rem"
          display="flex"
          border="1px solid"
          alignItems="center"
          flexDirection="column"
          borderRadius="0.625rem"
          borderColor="#FFFFFF1A"
          minWidth="max-content"
        >
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            $143,023,310.98
          </P>
          <P color="#FFFFFF80">Total Value Locked</P>
        </Div>
        <Div
          p="1.5rem"
          gap="0.25rem"
          display="flex"
          border="1px solid"
          alignItems="center"
          flexDirection="column"
          borderRadius="0.625rem"
          borderColor="#FFFFFF1A"
          minWidth="6rem"
        >
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            $52,358,809,514.02
          </P>
          <P color="#FFFFFF80">Cumulative Volume</P>
        </Div>
      </Div>
    </Div>
  );
};

export default LiquidityPools;
