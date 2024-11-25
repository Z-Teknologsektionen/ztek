import {
  type DetailedHTMLProps,
  type FC,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import SectionTitle from "./section-title";
import SectionWrapper from "./section-wrapper";

type SectionWithItemAndTextProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  children?: ReactNode;
  itemContent: ReactNode;
  textContent: ReactNode;
  title: string;
};

export const SectionWithItemAndText: FC<SectionWithItemAndTextProps> = ({
  textContent,
  itemContent,
  title,
  children,
}) => {
  return (
    <SectionWrapper className="group grid gap-y-8 space-y-0 lg:grid-cols-3 lg:gap-x-20">
      <div className="lg:col-span-2 group-odd:lg:order-2 group-even:lg:order-1">
        <SectionTitle className="mb-4">{title}</SectionTitle>
        {textContent}
      </div>
      <div className="lg:col-span-1 group-odd:lg:order-1 group-even:lg:order-2">
        {itemContent}
      </div>
      {children && <div className="order-last col-span-full">{children}</div>}
    </SectionWrapper>
  );
};
