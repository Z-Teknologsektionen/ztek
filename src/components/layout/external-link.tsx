import Link from "next/link";
import type { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from "react";

import { cn } from "~/utils/utils";

type ExternalLinkProps = {
  className?: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
};

const ExternalLink: FC<PropsWithChildren<ExternalLinkProps>> = ({
  className,
  href,
  children,
  target = "_self",
}) => {
  return (
    <Link
      className={cn(
        "text-blue-600 hover:text-blue-800 hover:underline",
        className,
      )}
      href={href}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      target={target}
    >
      {children}
    </Link>
  );
};

export default ExternalLink;
