import {
  type DetailedHTMLProps,
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";

interface ISectionTitle
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  center?: boolean;
}

const SectionTitle: FC<PropsWithChildren<ISectionTitle>> = ({
  children,
  center,
  className = "",
  ...rest
}) => {
  return (
    <h1
      className={`text-3xl font-semibold ${
        center ? "text-center" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </h1>
  );
};

export default SectionTitle;
