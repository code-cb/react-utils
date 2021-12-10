import { createContext, Dispatch, SetStateAction } from 'react';

export const DragDropContext = <TData>() =>
  createContext<DragDropContext<TData> | undefined>(undefined);

export interface DragDropContext<TData> {
  dragData: TData | undefined;
  setDragData: Dispatch<SetStateAction<TData | undefined>>;
}
