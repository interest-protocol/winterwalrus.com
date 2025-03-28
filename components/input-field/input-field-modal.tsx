import { Div, Img, Input, Label, P, Span } from '@stylin.js/elements';
import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useAppState } from '@/hooks/use-app-state';
import { useModal } from '@/hooks/use-modal';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { formatDollars, ZERO_BIG_NUMBER } from '@/utils';

import { SearchSVG } from '../svg';
import { InputFieldAssetProps } from './input-field.types';

const InputFieldModal: FC<InputFieldAssetProps> = ({
  assetList,
  name: fieldName,
}) => {
  const { handleClose } = useModal();
  const { setValue } = useFormContext();
  const [search, setSearch] = useState('');
  const { balances, principalsByType } = useAppState();

  return (
    <Div
      p="1.5rem"
      gap="1.5rem"
      height="70vh"
      width="27rem"
      display="flex"
      color="#ffffff"
      borderRadius="1rem"
      flexDirection="column"
      backdropFilter="blur(50px)"
      bg="linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.10))"
    >
      <Div display="flex" justifyContent="space-between">
        <P fontSize="1.25rem" fontWeight="600">
          Select asset
        </P>
        <Span
          py="0.25rem"
          px="0.75rem"
          bg="#FFFFFF1A"
          display="flex"
          fontWeight="500"
          cursor="pointer"
          borderRadius="0.5rem"
          onClick={handleClose}
        >
          ESC
        </Span>
      </Div>
      <Label
        px="1rem"
        gap="0.5rem"
        bg="#FFFFFF1A"
        display="flex"
        alignItems="center"
        borderRadius="0.75rem"
      >
        <Label color="#FFFFFF80">
          <SearchSVG maxWidth="1.25rem" width="100%" />
        </Label>
        <Input
          py="1rem"
          width="100%"
          border="none"
          outline="none"
          bg="transparent"
          color="#FFFFFF80"
          placeholder="Search asset"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </Label>
      <Div display="flex" flexDirection="column" gap="1rem" overflow="auto">
        {assetList
          .filter(
            ({ symbol, type, name }) =>
              !search ||
              type.toLowerCase() === search ||
              name.toLowerCase().includes(search) ||
              symbol.toLowerCase().includes(search)
          )
          .map(({ symbol, type, decimals, name, kind, Icon }) => (
            <Div
              p="1rem"
              key={type}
              display="grid"
              cursor="pointer"
              borderRadius="1rem"
              border="1px solid #FFFFFF1A"
              gridTemplateColumns="2fr 1fr 1fr"
              nHover={{ borderColor: '#99EFE44D' }}
              onClick={() => {
                setValue(`${fieldName}.value`, 0);
                setValue(`${fieldName}.type`, type);
                handleClose();
              }}
            >
              <Div display="flex" gap="1rem" alignItems="center">
                {typeof Icon === 'string' ? (
                  <Span display="flex" overflow="hidden" borderRadius="0.25rem">
                    <Img src={Icon} alt={symbol} maxWidth="2.5rem" />
                  </Span>
                ) : (
                  <Span display="flex" overflow="hidden" borderRadius="50%">
                    <Icon width="100%" maxWidth="2.5rem" />
                  </Span>
                )}

                <P>{name}</P>
              </Div>
              <Div display="flex" alignItems="center">
                <Span
                  px="0.75rem"
                  py="0.25rem"
                  bg="#FFFFFF14"
                  fontSize="0.825rem"
                  borderRadius="1.5rem"
                  textTransform="uppercase"
                >
                  {kind}
                </Span>
              </Div>
              <Div
                gap="0.25rem"
                display="flex"
                textAlign="right"
                flexDirection="column"
              >
                <P fontSize="0.875rem" fontFamily="JetBrains Mono">
                  {
                    +FixedPointMath.toNumber(
                      principalsByType[type] ??
                        balances[type] ??
                        ZERO_BIG_NUMBER,
                      decimals
                    ).toFixed(4)
                  }
                </P>
                <P fontSize="0.75rem" opacity="0.6" fontFamily="JetBrains Mono">
                  {formatDollars(1000)}
                </P>
              </Div>
            </Div>
          ))}
      </Div>
    </Div>
  );
};

export default InputFieldModal;
