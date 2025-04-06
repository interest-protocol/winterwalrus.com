import toast from 'react-hot-toast';

import {
  ToastLoadingProps,
  ToastProps,
  ToastSuccessProps,
} from './toast.types';
import ToastError from './toast-error';
import ToastLoading from './toast-loading';
import ToastSuccess from './toast-success';

const dismissHandler = (toastId: string) => () => toast.dismiss(toastId);

export const toasting = {
  error: (args: ToastProps) => dismissHandler(toast(<ToastError {...args} />)),
  success: (args: ToastSuccessProps) =>
    dismissHandler(toast(<ToastSuccess {...args} />)),
  loading: (args: ToastLoadingProps) =>
    dismissHandler(
      toast.loading(<ToastLoading {...args} />, {
        duration: Infinity,
      })
    ),
};
