import type { IconEnum } from "@prisma/client";
import Link from "next/link";
import type { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TOOLTIP_DELAY_MS } from "~/constants/delay-constants";
import {
  getSocialIconFromEnum,
  getSocialNameFromEnum,
} from "~/utils/get-social-from-enum";

type CommitteeSocialIconProps = {
  iconVariant: IconEnum;
  linkText?: string | null;
  url: string;
};

export const CommitteeSocialIcon: FC<CommitteeSocialIconProps> = ({
  iconVariant,
  url,
  linkText,
}) => {
  const Icon = getSocialIconFromEnum(iconVariant);
  const text = linkText ?? getSocialNameFromEnum(iconVariant);

  const isExternalLink = url.startsWith("http");
  const isEmail = iconVariant === "MAIL";

  return (
    <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={isEmail ? `mailto:${url}` : url}
            rel={isExternalLink ? "noopener noreferrer" : undefined}
            target={isExternalLink ? "_blank" : "_self"}
          >
            <Icon size={20} />
            <p className="sr-only">{text}</p>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
