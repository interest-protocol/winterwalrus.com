import { Div, Input, Label, P, Span } from '@stylin.js/elements';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSessionStorage } from 'usehooks-ts';

import { SearchSVG } from '@/components/svg';
import { INTEREST_LABS, VALIDATOR_STORAGE_KEY } from '@/constants';
import { useAllowedNodes } from '@/hooks/use-allowed-nodes';
import { useModal } from '@/hooks/use-modal';

const SettingsMenuValidatorModal: FC = () => {
  const { handleClose } = useModal();
  const [search, setSearch] = useState('');
  const { getValues, setValue } = useFormContext();
  const [validator, setValidator] = useSessionStorage(
    VALIDATOR_STORAGE_KEY,
    INTEREST_LABS
  );

  const { nodes } = useAllowedNodes(getValues('out.type'));

  useEffect(() => {
    setValue('validator', validator);
  }, [validator]);

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
          Select validator
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
        {nodes
          ?.filter(
            ({ id, name }) =>
              !search ||
              id.toLowerCase() === search ||
              name.toLowerCase().includes(search)
          )
          .map(({ name, id }) => (
            <Div
              p="1rem"
              key={id}
              display="flex"
              cursor="pointer"
              borderRadius="1rem"
              border="1px solid #FFFFFF1A"
              nHover={{ borderColor: '#99EFE44D' }}
              onClick={() => {
                setValidator(id);
                handleClose();
              }}
            >
              <Div display="flex" gap="1rem" alignItems="center">
                <P>{name}</P>
              </Div>
              <Div
                gap="0.25rem"
                display="flex"
                textAlign="right"
                flexDirection="column"
              ></Div>
            </Div>
          ))}
      </Div>
    </Div>
  );
};

export default SettingsMenuValidatorModal;
