import { Div, P, Span } from '@stylin.js/elements';
import { FC } from 'react';

import { ErrorSVG } from '../svg';
import { ToastProps } from './toast.types';
import ToastTimer from './toast-timer';

const ToastError: FC<ToastProps> = ({ action, message }) => (
  <>
    <Div display="flex" alignItems="center" gap="1rem">
      <Div
        width="2rem"
        height="2rem"
        color="#F04248"
        borderRadius="50%"
        boxShadow="0 0 5rem 1rem #F04248, inset 0 0 1rem 1rem #463846"
      >
        <Span
          width="2rem"
          height="2rem"
          display="flex"
          borderRadius="50%"
          alignItems="center"
          justifyContent="center"
        >
          <ErrorSVG maxWidth="1.25rem" width="100%" />
        </Span>
      </Div>
      <Div>
        <P color="#FFFFFF">{action} failed!</P>
        {message && <P color="#C8C5C5">{message}</P>}
      </Div>
    </Div>
    <ToastTimer color="#F04248" />
  </>
);

export default ToastError;
