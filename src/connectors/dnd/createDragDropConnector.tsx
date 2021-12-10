import {
  DragEventHandler,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { memo } from 'hocs';
import { useRequiredContext } from 'hooks';
import { DragDropContext } from './DragDropContext';

export const createDragDropConnector = <TData extends unknown>() => {
  const Context = DragDropContext<TData>();

  const DragDropProviderComponent = ({ children }: DragDropProviderProps) => {
    const [dragData, setDragData] = useState<TData | undefined>();
    const contextValue = useMemo<DragDropContext<TData>>(
      () => ({ dragData, setDragData }),
      [dragData, setDragData],
    );
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  };

  const DragDropProvider = memo(DragDropProviderComponent);

  const useDragDropContext = () =>
    useRequiredContext(
      Context,
      'useDraggable or useDroppable',
      'DragDropProvider',
    );

  const useDraggable = ({
    data,
    getDragImageStyle,
  }: {
    data: TData;
    getDragImageStyle?: (target: HTMLElement) => Partial<CSSStyleDeclaration>;
  }) => {
    const [isDragging, setIsDragging] = useState(false);
    const { setDragData } = useDragDropContext();
    const dragImageRef = useRef<HTMLElement>();

    const handleDragEnd = useCallback(() => {
      setDragData(undefined);
      setIsDragging(false);
      if (dragImageRef.current) {
        dragImageRef.current.remove();
      }
    }, [setDragData]);

    const handleDragStart = useCallback<DragEventHandler<HTMLElement>>(
      e => {
        setDragData(data);
        setIsDragging(true);
        e.dataTransfer.dropEffect = 'move';
        if (getDragImageStyle) {
          const target = e.target as HTMLElement;
          const rect = target.getBoundingClientRect();
          const dragImage = target.cloneNode(true) as HTMLElement;
          const style = getDragImageStyle(target);
          Object.assign(dragImage.style, {
            position: 'absolute',
            top: `-1000px`,
            left: `-1000px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            ...style,
          });
          document.body.appendChild(dragImage);
          e.dataTransfer.setDragImage(
            dragImage,
            e.clientX - rect.left,
            e.clientY - rect.top,
          );
          dragImageRef.current = dragImage;
        }
      },
      [data, setDragData],
    );
    return { handleDragEnd, handleDragStart, isDragging };
  };

  const useDroppable = ({
    isAllowed,
    onDropData,
  }: {
    isAllowed: (data: TData) => boolean;
    onDropData: (data: TData) => void | Promise<unknown>;
  }) => {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const { dragData } = useDragDropContext();

    const handleDragLeave = useCallback(() => setIsDraggingOver(false), []);

    const handleDragOver = useCallback<DragEventHandler>(
      e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragData != null && isAllowed(dragData)) {
          setIsDraggingOver(true);
        } else {
          e.dataTransfer.effectAllowed = 'none';
        }
      },
      [dragData, isAllowed],
    );

    const handleDrop = useCallback<DragEventHandler>(
      async e => {
        e.preventDefault();
        if (dragData != null && isAllowed(dragData)) {
          await onDropData(dragData);
          setIsDraggingOver(false);
        }
      },
      [dragData, isAllowed, onDropData],
    );

    return {
      dragData,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      isDraggingOver,
    };
  };

  return {
    DragDropProvider,
    useDraggable,
    useDroppable,
  };
};

export interface DragDropProviderProps {
  children?: ReactNode;
}
