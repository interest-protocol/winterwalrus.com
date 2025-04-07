import { formatAddress } from '@mysten/sui/utils';
import { Div, Input, Label, P } from '@stylin.js/elements';
import { FC, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { SearchSVG } from '@/components/svg';
import { INTEREST_LABS, VALIDATOR_STORAGE_KEY } from '@/constants';
import { useAllowedNodes } from '@/hooks/use-allowed-nodes';
import { useModal } from '@/hooks/use-modal';

const SettingsMenuValidatorModal: FC = () => {
  const { handleClose } = useModal();
  const { nodes } = useAllowedNodes();
  const [search, setSearch] = useState('');
  const [validator, setValidator] = useLocalStorage(
    VALIDATOR_STORAGE_KEY,
    INTEREST_LABS
  );

  return (
    <>
      <Label
        px="1rem"
        mx="0.5rem"
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
          placeholder="Search validator"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </Label>
      <Div
        gap="1rem"
        px="0.5rem"
        display="flex"
        overflow="auto"
        flexDirection="column"
      >
        {nodes
          ?.filter(
            ({ id, name }) =>
              !search ||
              id.toLowerCase() === search ||
              name.toLowerCase().includes(search)
          )
          .map(({ name, id }, index) => (
            <Div
              p="1rem"
              key={id}
              display="flex"
              border="1px solid"
              alignItems="center"
              borderRadius="1rem"
              justifyContent="space-between"
              bg={id === validator ? '#FFFFFF11' : 'transparent'}
              cursor={id === validator ? 'not-allowed' : 'pointer'}
              borderColor={id === validator ? '#C484F6' : '#FFFFFF1A'}
              nHover={{
                borderColor: id === validator ? '#C484F6' : '#99EFE44D',
              }}
              onClick={() => {
                if (id === validator) return;
                setValidator(id);
                handleClose();
              }}
            >
              <Div display="flex" gap="0.25rem" flexDirection="column">
                <P>{name}</P>
                <P>{formatAddress(id)}</P>
              </Div>
              {!index && (
                <P
                  px="0.5rem"
                  py="0.25rem"
                  gap="0.25rem"
                  bg="#99EFE414"
                  display="flex"
                  color="#83F34E"
                  textAlign="right"
                  fontSize="0.875rem"
                  borderRadius="1.7rem"
                  flexDirection="column"
                >
                  Default
                </P>
              )}
            </Div>
          ))}
      </Div>
    </>
  );
};

export default SettingsMenuValidatorModal;
