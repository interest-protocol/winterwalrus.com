import { Div } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';
import { Toaster } from 'react-hot-toast';

import useEventListener from '@/hooks/use-event-listener';
import { useModal } from '@/hooks/use-modal';
import { useSafeHeight } from '@/hooks/use-safe-height';

const Motion = motion.create(Div);

const ModalProvider: FC = () => {
  const safeHeight = useSafeHeight();

  const {
    content,
    onClose,
    allowClose,
    handleClose,
    overlayProps,
    containerProps,
  } = useModal();

  const onHandleClose = () => {
    if (!allowClose) return;

    handleClose();
    onClose?.();
  };

  useEventListener(
    'keydown',
    (e) => {
      if (e && (e as KeyboardEvent).key === 'Escape') onHandleClose();
    },
    true
  );

  if (!content) return null;

  return (
    <AnimatePresence>
      {content && (
        <Motion
          inset="0"
          bg="#0007"
          width="100vw"
          display="flex"
          zIndex="999999"
          position="fixed"
          height={safeHeight}
          exit={{ opacity: 0 }}
          justifyContent="center"
          onClick={onHandleClose}
          backdropFilter="blur(10px)"
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          alignItems={['flex-end', 'center']}
          pb={`calc(100vh - ${safeHeight}px)`}
          {...overlayProps}
        >
          <Toaster />
          <Motion
            display="flex"
            maxWidth={['100vw', '95vw']}
            maxHeight={[safeHeight * 0.9, '90vh']}
            transition={{ duration: 0.5, delay: 0.2 }}
            animate={{ y: ['200vh', '0vh'], scale: [0.5, 1] }}
            {...containerProps}
            onClick={(e) => {
              e.stopPropagation();
              containerProps?.onClick?.(e);
            }}
          >
            {content}
          </Motion>
        </Motion>
      )}
    </AnimatePresence>
  );
};

export default ModalProvider;
