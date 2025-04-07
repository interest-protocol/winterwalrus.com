import { StakingObject } from '@/interface';

export interface NFTAssetsItemModalProps extends StakingObject {
  activationTime: number;
  nodeName?: string | null;
  isActivated: (args: number) => boolean;
}
