import { Context, useContext } from "react";

export const useRequiredContext = <TContextValue>(
  context: Context<TContextValue | undefined>,
  hookName: string,
  providerName: string,
) => {
  const contextValue = useContext(context);
  if (contextValue === undefined) {
    throw new Error(`${hookName} must be used within a ${providerName}`);
  }
  return contextValue;
};
