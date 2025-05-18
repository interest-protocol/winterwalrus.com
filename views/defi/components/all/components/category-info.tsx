import { Div, P } from '@stylin.js/elements';
import type { FC } from 'react';

interface CategoryInfoProps {
  category: string;
}

const CategoryInfo: FC<CategoryInfoProps> = ({ category }) => {
  return (
    <Div
      p="0.75rem"
      display="flex"
      bg="#1A1A1A"
      borderRadius="0.5rem"
      flexDirection="column"
      gap="0.25rem"
      alignItems="center"
      justifyContent="center"
    >
      <P color="#FFFFFF" fontSize="0.75rem" fontWeight="500">
        {category}
      </P>
      <P color="#FFFFFF80" fontSize="0.75rem">
        Category
      </P>
    </Div>
  );
};

export default CategoryInfo;
