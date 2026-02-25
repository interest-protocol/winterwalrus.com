import { Aftermath } from 'aftermath-ts-sdk';
import useSWR from 'swr';

const useAftermathSdk = () => {
  const { data } = useSWR<Aftermath>(
    [useAftermathSdk.name, 'aftermath'],
    async () => {
      const afSdk = new Aftermath('MAINNET');
      await afSdk.init();
      return afSdk;
    }
  );

  return data;
};

export default useAftermathSdk;
