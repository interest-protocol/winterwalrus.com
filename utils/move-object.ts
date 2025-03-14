import { MoveStruct, SuiParsedData } from '@mysten/sui/client';

export const isMoveObject = (
  content?: SuiParsedData | null | undefined
): content is {
  dataType: 'moveObject';
  fields: MoveStruct;
  hasPublicTransfer: boolean;
  type: string;
} => content?.dataType === 'moveObject';
