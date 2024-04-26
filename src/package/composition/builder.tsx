import { ComponentPropsWithoutRef, ComponentType, PropsWithChildren, ReactNode } from "react";

export const provider = <T extends ComponentType<any>>(
  Component: T,
  prop: Omit<ComponentPropsWithoutRef<T>, "children">,
): [T, ComponentPropsWithoutRef<T>] => [Component, prop as ComponentPropsWithoutRef<T>];

export const tree = <T extends ReturnType<typeof provider>>(providerTree: Array<T>) => {
  return function Wrapper({ children }: PropsWithChildren): ReactNode {
    return providerTree.reduceRight<ReactNode>((acc, [Provider, props]) => {
      return <Provider {...props}>{acc}</Provider>;
    }, children);
  };
};

export const builder = { provider, tree };
