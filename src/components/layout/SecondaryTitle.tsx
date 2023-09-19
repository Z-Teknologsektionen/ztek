import {
  type DetailedHTMLProps,
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import { cn } from "~/utils/utils";

interface ISecondaryTitle
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  center?: boolean;
}

const SecondaryTitle: FC<PropsWithChildren<ISecondaryTitle>> = ({
  children,
  center,
  className = "",
  ...rest
}) => {
  return (
    <h3
      className={cn(
        `text-xl font-semibold`,
        center ? "text-center" : "",
        className
      )}
      {...rest}
    >
      {children}
    </h3>
  );
};

export default SecondaryTitle;
