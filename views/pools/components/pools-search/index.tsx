import { Input, Label } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { SearchSVG } from '@/components/svg';

const PoolsSearch: FC = () => {
  const { register } = useFormContext();

  return (
    <Label
      width="100%"
      gap="0.5rem"
      bg="#FFFFFF1A"
      display="flex"
      padding="0 1rem"
      height="3.125rem"
      color="#FFFFFF80"
      fontSize="0.875rem"
      alignItems="center"
      borderRadius="0.625rem"
      maxWidth={['100%', '17.625rem']}
    >
      <SearchSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
      <Input
        all="unset"
        width="100%"
        placeholder="Search pools..."
        cursor="text"
        {...register('search')}
      />
    </Label>
  );
};

export default PoolsSearch;
