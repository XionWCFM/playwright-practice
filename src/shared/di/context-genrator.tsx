import { createContext, useContext as useReactContext } from "react";

export const contextGenerator = <T extends Record<string, any>>(
  initialValue: T | null,
) => {
  type GeneratedContextType = T | null;
  const Context = createContext<GeneratedContextType>(initialValue);
  const useContext = () => {
    const value = useReactContext(Context);
    if (value === null) {
      throw new Error("should provid context");
    }
    return value;
  };

  return {
    useContext: useContext,
    Provider: Context.Provider,
    Consumer: Context.Consumer,
  };
};
