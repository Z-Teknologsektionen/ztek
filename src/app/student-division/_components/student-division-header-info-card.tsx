import type { FC } from "react";
import CenteredButtonWithLink from "~/components/buttons/centered-button-with-link";
import SecondaryTitle from "~/components/layout/secondary-title";

type StudentDivisionHeaderInfoCardProps = {
  description: string;
  href: string;
  label: string;
  title: string;
};

export const StudentDivisionHeaderInfoCard: FC<
  StudentDivisionHeaderInfoCardProps
> = ({ description, href, label, title }) => {
  return (
    <div className="flex flex-col rounded-md">
      <div className="pb-4">
        <SecondaryTitle center>{title}</SecondaryTitle>
        <p className="mx-4">{description}</p>
      </div>
      <CenteredButtonWithLink href={href}>{label}</CenteredButtonWithLink>
    </div>
  );
};
