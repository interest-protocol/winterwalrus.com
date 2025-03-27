import { Div } from '@stylin.js/elements';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';

const dismiss = toast.dismiss;
const toaster = (message: string | ReactNode) => toast(message as never);

export const useToast = () => ({
  dismiss,
  error: toaster,
  success: toaster,
  loading: toaster,
  promise: async (promise: Promise<unknown>): Promise<void> => {
    const id = toaster(<Div></Div>); // loading
    try {
      await promise;
      toaster(<Div></Div>); //success
    } catch (e) {
      toaster(<Div></Div>); //error
    } finally {
      toast.dismiss(id);
    }
  },
});
