export type OmitFrom<T, K extends keyof T> = Omit<T, K>;

export type ValueFactory<T> = T | (() => T);
