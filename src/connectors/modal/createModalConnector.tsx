import { ComponentType, ReactElement, useCallback, useEffect } from 'react';
import { useForceUpdate, useRequiredContext } from 'hooks';
import { OmitFrom } from 'types';
import { ModalContext, ModalKey } from './ModalContext';

const useModalContext = () =>
  useRequiredContext(ModalContext, 'useModal or useShowModal', 'ModalProvider');

const createUseModal =
  <TPayload,>(key: ModalKey) =>
  () => {
    const { getState, setState, subscribe } = useModalContext();
    const forceUpdate = useForceUpdate();
    const onClose = useCallback(() => {
      setState(key, prevState => ({
        ...prevState,
        flag: false,
      }));
    }, [setState]);

    useEffect(() => subscribe(key, forceUpdate), [forceUpdate, subscribe]);

    return {
      open: !!getState(key)?.flag,
      payload: getState(key)?.payload as TPayload | undefined,
      onClose,
    };
  };

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const createModalConnector = <TPayload extends unknown = void>(
  key: ModalKey,
) => ({
  useModal: createUseModal<TPayload>(key),
  useShowModal: () => {
    const { setState } = useModalContext();
    return useCallback(
      (...args: void extends TPayload ? [] : [TPayload]) => {
        const payload = args[0];
        setState(key, prevState => ({
          ...prevState,
          flag: true,
          ...(payload && { payload }),
        }));
      },
      [setState],
    );
  },
  withoutPayload: <TProps extends ModalBaseProps>(
    Component: ComponentType<TProps>,
  ) => {
    const useModal = createUseModal<TPayload>(key);

    return (props: OmitFrom<TProps, keyof ModalBaseProps>) => {
      const { open, onClose } = useModal();
      const componentProps = { ...props, open, onClose } as TProps;
      return <Component {...componentProps} />;
    };
  },
  withPayload: <TProps extends WithPayloadProps<TPayload>>(
    Component: ComponentType<TProps>,
  ) => {
    const useModal = createUseModal<TPayload>(key);

    return (
      props: OmitFrom<TProps, keyof WithPayloadProps<TPayload>>,
    ): ReactElement | null => {
      const { onClose, open, payload } = useModal();
      if (!payload) return null;
      const componentProps = { ...props, onClose, open, payload } as TProps;
      return <Component {...componentProps} />;
    };
  },
});

export interface ModalBaseProps {
  onClose: VoidFunction;
  open: boolean;
}

export interface WithPayloadProps<TPayload> extends ModalBaseProps {
  payload: TPayload;
}
