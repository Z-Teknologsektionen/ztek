import type { IconEnum } from "@prisma/client";
import Link from "next/link";
import type { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  getSocialIconFromEnum,
  getSocialNameFromEnum,
} from "~/utils/get-social-from-enum";

type CommitteeSocialIconProps = {
  iconVariant: IconEnum;
  url: string;
};

const CommitteeSocialIcon: FC<CommitteeSocialIconProps> = ({
  iconVariant,
  url,
}) => {
  const Icon = getSocialIconFromEnum(iconVariant);
  const iconName = getSocialNameFromEnum(iconVariant);

  const isExternalLink = url.startsWith("http");
  const isEmail = iconVariant === "MAIL";

  return (
    <Tooltip>
      <TooltipTrigger>
        <Link
          href={isEmail ? `mailto:${url}` : url}
          rel={isExternalLink ? "noopener noreferrer" : undefined}
          target={isExternalLink ? "_blank" : "_self"}
        >
          <Icon size={20} />
          <p className="sr-only">{iconName}</p>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{iconName}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CommitteeSocialIcon;
