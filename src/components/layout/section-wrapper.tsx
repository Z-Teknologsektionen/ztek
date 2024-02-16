import {
  type DetailedHTMLProps,
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import { cn } from "~/utils/utils";

interface ISectionWrapper
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  a?: boolean;
}

const SectionWrapper: FC<PropsWithChildren<ISectionWrapper>> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <section
      className={cn(
        "mx-auto max-w-7xl space-y-8 px-4 py-16 md:px-6 xl:px-4",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
