import { StakingObject } from '@/interface';

export interface NFTAssetsItemModalProps extends StakingObject {
  nodeName?: string | null;
  isActivated: (args: number) => boolean;
}
