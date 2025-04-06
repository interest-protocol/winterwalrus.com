import { P } from '@stylin.js/elements';
import { FC } from 'react';

import { ToastLoadingProps } from './toast.types';
import ToastTimer from './toast-timer';

const ToastLoading: FC<ToastLoadingProps> = ({ message }) => (
  <>
    <P color="#FFFFFF" py="0.5rem">
      {message ?? 'Loading...'}
    </P>
    <ToastTimer loading color="#DDDDDD" />
  </>
);

export default ToastLoading;
