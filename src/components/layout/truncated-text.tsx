import type { FC } from "react";
import { cn } from "~/utils/utils";

type TruncatedTextProps = {
  className?: string;
  text: string;
};

const TruncatedText: FC<TruncatedTextProps> = ({ className, text }) => {
  return <p className={cn("truncate", className)}>{text}</p>;
};

export default TruncatedText;
