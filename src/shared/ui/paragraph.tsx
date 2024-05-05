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

type ParagraphType = <C extends ElementType = "p" | "span" | "strong">(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Paragraph: ParagraphType = forwardRef(function Paragraph<C extends ElementType = "p">(
  { children, as, className, ...rest }: Props<C>,
  ref?: PolymorphicRef<C>,
) {
  const Component = as || "p";

  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
});
