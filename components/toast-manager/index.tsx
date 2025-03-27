import { FC } from 'react';
import { Toaster } from 'react-hot-toast';

const ToastManager: FC = () => (
  <Toaster position="bottom-right" toastOptions={{ style: { all: 'unset' } }} />
);

export default ToastManager;
