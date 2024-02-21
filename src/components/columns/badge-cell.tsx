import type { VariantProps } from "class-variance-authority";
import type { FC, PropsWithChildren } from "react";
import type { badgeVariants } from "~/components/ui/badge";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/utils/utils";

const BadgeCell: FC<
  PropsWithChildren<{
    className?: string;
    variant?: VariantProps<typeof badgeVariants>["variant"];
  }>
> = ({ variant = "outline", className = "", children }) => {
  return (
    <Badge
      className={cn("grid w-fit place-items-center text-center", className)}
      variant={variant}
    >
      {children}
    </Badge>
  );
};

export default BadgeCell;
