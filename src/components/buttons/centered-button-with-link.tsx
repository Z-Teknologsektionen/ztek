import Link from "next/link";
import type { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/utils/utils";

type CenteredButtonWithLinkProps = {
  className?: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
};

const CenteredButtonWithLink: FC<
  PropsWithChildren<CenteredButtonWithLinkProps>
> = ({ className, href, children, target = "_self" }) => {
  return (
    <Button
      className={cn(
        "mx-auto mt-auto block w-fit transition-all hover:ring hover:ring-zWhite",
        className,
      )}
      variant={"outline"}
      asChild
    >
      <Link
        href={href}
        rel={target === "_blank" ? "noopener noreferrer" : ""}
        target={target}
      >
        {children}
      </Link>
    </Button>
  );
};

export default CenteredButtonWithLink;
