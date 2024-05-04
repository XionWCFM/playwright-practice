import { ElementType, ReactNode, forwardRef } from "react";
import { PolymorphicComponentProps, PolymorphicComponentPropsWithRef, PolymorphicRef } from "./polymorphic.type";

type Size = "small" | "large";

type Props<C extends ElementType> = PolymorphicComponentProps<
  C,
  {
    size?: Size;
    className?: string;
  }
>;

type ButtonType = <C extends ElementType = "button">(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Button: ButtonType = forwardRef(function Button<C extends ElementType = "button">(
  { children, size = "small", as, className, ...rest }: Props<C>,
  ref?: PolymorphicRef<C>,
) {
  const Component = as || "button";

  return (
    <Component ref={ref} size={size} className={" bg-purple-700 text-white p-16" + "" + className} {...rest}>
      {children}
    </Component>
  );
});
