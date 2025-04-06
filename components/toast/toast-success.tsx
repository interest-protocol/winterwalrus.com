import { Div, P, Span } from '@stylin.js/elements';
import Link from 'next/link';
import { FC } from 'react';

import { CheckSVG } from '../svg';
import { ToastProps, ToastSuccessProps } from './toast.types';
import ToastTimer from './toast-timer';

const ToastContent: FC<ToastProps> = ({ action, message }) => (
  <Div display="flex" alignItems="center" gap="1rem">
    <Div
      width="2rem"
      height="2rem"
      color="#00DF80"
      borderRadius="50%"
      boxShadow="0 0 5rem 1rem #00DF80, inset 0 0 1rem 1rem #2C4A47"
    >
      <Span
        width="2rem"
        height="2rem"
        display="flex"
        borderRadius="50%"
        alignItems="center"
        justifyContent="center"
      >
        <CheckSVG maxWidth="1.25rem" width="100%" />
      </Span>
    </Div>
    <Div>
      <P color="#FFFFFF">{action} Successfully!</P>
      {message && <P color="#C8C5C5">{message}</P>}
    </Div>
    <ToastTimer color="#00DF80" />
  </Div>
);

const ToastSuccess: FC<ToastSuccessProps> = ({ link, ...props }) => {
  if (link)
    return (
      <Link href={link} target="_blank">
        <ToastContent {...props} />
      </Link>
    );

  return <ToastContent {...props} />;
};

export default ToastSuccess;
