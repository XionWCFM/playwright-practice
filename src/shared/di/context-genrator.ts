"use client";
import { createContext, useContext as useReactContext } from "react";
/**
 * null Assertion이 내장된 useContext와 null 유니온 처리를 알아서 수행하는 유틸함수입니다.
 *
 * @template T - The expected shape of the context value.
 * @param {T | null} initialValue - The initial value for the context; it can be an object
 *                                  conforming to the shape T or null.
 * @returns {Object} The context object containing:
 *  - `useContext`: A hook that ensures the context value is not null and returns the context value.
 *  - `Provider`: The React context provider component.
 *  - `Consumer`: The React context consumer component.
 *
 * @throws {Error} Throws an error if the context value is null when attempting to consume the context.
 *
 * @example
 * const ChaeunContext = contextGenerator<{name:string}>(null)
 * const useChaeunContext = ChaeunContext.useContext
 */
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
