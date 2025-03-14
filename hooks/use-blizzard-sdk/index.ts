import { BlizzardSDK } from '@interest-protocol/blizzard-sdk';

const blizzardSdk = new BlizzardSDK();

const useBlizzardSdk = (): BlizzardSDK => blizzardSdk;

export default useBlizzardSdk;
