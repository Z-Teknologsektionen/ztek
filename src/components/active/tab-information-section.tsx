import type { FC } from "react";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";

export type TabInformationSectionProps = {
  description?: string;
  instructions?: string[];
  title: string;
};

const TabInformationSection: FC<TabInformationSectionProps> = ({
  title,
  description = "",
  instructions = [],
}) => {
  return (
    <SectionWrapper className="mb-0 space-y-4 pb-0">
      <div className="max-w-3xl">
        <div className="space-y-2">
          <SectionTitle>{title}</SectionTitle>
          {description !== "" && <p>{description}</p>}
        </div>
        {instructions.length !== 0 && (
          <ul className="list-disc px-7">
            {instructions.map((instruction) => (
              <li key={instruction}>
                <p>{instruction}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionWrapper>
  );
};

export default TabInformationSection;
