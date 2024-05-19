import Link from "next/link";
import type { FC } from "react";
import SectionWrapper from "~/components/layout/section-wrapper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TOOLTIP_DELAY_MS } from "~/constants/delay-constants";
import { studentQuickLinks } from "~/data/student-quick-links";

export const StudentQuickLinksSection: FC = () => {
  return (
    <SectionWrapper className="pt-2">
      <div className="grid grid-cols-3 gap-3 md:grid-cols-5 lg:grid-cols-7">
        {studentQuickLinks.map(({ href, icon: Icon, text, tooltip }) => (
          <TooltipProvider key={text} delayDuration={TOOLTIP_DELAY_MS}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="col-span-1 mx-auto flex flex-col items-center justify-center rounded-lg text-center transition-all hover:ring hover:ring-zWhite"
                  href={href}
                  target="_blank"
                >
                  <Icon className="fill-black" size="3rem" />
                  <p className="text-center text-xs">{text}</p>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-zWhite">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </SectionWrapper>
  );
};
