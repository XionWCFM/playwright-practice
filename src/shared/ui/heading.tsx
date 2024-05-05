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

type HeadingType = <C extends ElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6">(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Heading: HeadingType = forwardRef(function Heading<C extends ElementType = "h2">(
  { children, as, className, ...rest }: Props<C>,
  ref?: PolymorphicRef<C>,
) {
  const Component = as || "h2";

  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
});
