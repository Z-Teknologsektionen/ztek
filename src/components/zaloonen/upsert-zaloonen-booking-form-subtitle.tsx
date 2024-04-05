import type { FC } from "react";
import { Label } from "~/components/ui/label";

type CreateZaloonenBookingFormSubtitleProps = {
  description: string;
  title: string;
};

const UpsertZaloonenBookingFormSubtitle: FC<
  CreateZaloonenBookingFormSubtitleProps
> = ({ description, title }) => {
  return (
    <div className="col-span-full pt-4 lg:-mx-4">
      <Label className="text-lg">{title}</Label>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
};

export default UpsertZaloonenBookingFormSubtitle;
