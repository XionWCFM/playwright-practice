import { ElementType, ReactNode, forwardRef } from "react";
import {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "~/src/package/polymorphic/polymorphic.type";

type Props<C extends ElementType> = PolymorphicComponentProps<
  C,
  {
    className?: string;
  }
>;

type StackType = <C extends ElementType = "div">(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Stack: StackType = forwardRef(function Stack<C extends ElementType = "div">(
  { children, as, className, ...rest }: Props<C>,
  ref?: PolymorphicRef<C>,
) {
  const Component = as || "div";

  return (
    <Component ref={ref} className={`flex flex-col ${className}`} {...rest}>
      {children}
    </Component>
  );
});
