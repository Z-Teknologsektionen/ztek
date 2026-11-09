import Link from "next/link";
import type { IconType } from "react-icons";
import { type FC } from "react";

interface QuickLinkProps {
  icon: IconType;
  label: string;
  link: string;
  rel: string;
  target: string;
}

const QuickLink: FC<QuickLinkProps> = ({
  icon: Icon,
  label,
  link,
  target,
  rel,
}) => {
  return (
    <Link
      className="flex flex-col items-center justify-center gap-2 rounded-xl bg-zBlack px-4 py-5 text-center text-zWhite transition-colors hover:bg-zDarkGray"
      href={link}
      rel={rel}
      target={target}
    >
      <Icon size={22} />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default QuickLink;
