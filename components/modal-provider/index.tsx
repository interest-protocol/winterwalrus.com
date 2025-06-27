import { Div, P, Span } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';

import useEventListener from '@/hooks/use-event-listener';
import { useModal } from '@/hooks/use-modal';
import { useSafeHeight } from '@/hooks/use-safe-height';

const Motion = motion.create(Div);

const ModalProvider: FC = () => {
  const {
    title,
    content,
    onClose,
    allowClose,
    handleClose,
    overlayProps,
    containerProps,
  } = useModal();
  const safeHeight = useSafeHeight();

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
          zIndex="99"
          width="100vw"
          display="flex"
          position="fixed"
          height={safeHeight}
          exit={{ opacity: 0 }}
          justifyContent="center"
          onClick={onHandleClose}
          backdropFilter="blur(10px)"
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          pt={`calc(100vh - ${safeHeight}px)`}
          alignItems={['flex-end', 'flex-end', 'center']}
          {...overlayProps}
        >
          <Motion
            display="flex"
            maxWidth={['100vw', '100vw', '95vw']}
            transition={{ duration: 0.5, delay: 0.2 }}
            animate={{ y: ['200vh', '0vh'], scale: [0.5, 1] }}
            maxHeight={[safeHeight * 0.9, safeHeight * 0.9, '90vh']}
            {...containerProps}
            onClick={(e) => {
              e.stopPropagation();
              containerProps?.onClick?.(e);
            }}
          >
            <Div
              p="1rem"
              gap="1.5rem"
              width="27rem"
              display="flex"
              color="#ffffff"
              maxHeight="100%"
              flexDirection="column"
              backdropFilter="blur(50px)"
              borderRadius={['1rem 1rem 0 0', '1rem 1rem 0 0', '1rem']}
              bg="linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.10))"
            >
              <Div
                px="0.5rem"
                pt="0.5rem"
                display="flex"
                justifyContent="space-between"
              >
                <P fontSize="1.25rem" fontWeight="600">
                  {title}
                </P>
                <Span
                  py="0.25rem"
                  px="0.75rem"
                  bg="#FFFFFF1A"
                  display="flex"
                  fontWeight="500"
                  cursor="pointer"
                  borderRadius="0.5rem"
                  onClick={handleClose}
                >
                  ESC
                </Span>
              </Div>
              {content}
            </Div>
          </Motion>
        </Motion>
      )}
    </AnimatePresence>
  );
};

export default ModalProvider;
