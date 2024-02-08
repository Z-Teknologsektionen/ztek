import type { FC } from "react";
import { Button } from "~/components/ui/button";

const CommitteeSocialLinksListActions: FC<{
  hasUpdatedSocialLinks: boolean;
  resetSocialLinks: () => void;
  saveSocialLinks: () => void;
}> = ({ resetSocialLinks, saveSocialLinks, hasUpdatedSocialLinks }) => {
  return (
    <div className="flex flex-row justify-end gap-2">
      <Button onClick={resetSocialLinks} variant="outline">
        Återställ
      </Button>
      <Button
        className={`${hasUpdatedSocialLinks && "animate-pulse duration-1000"}`}
        onClick={saveSocialLinks}
      >
        Spara
      </Button>
    </div>
  );
};

export default CommitteeSocialLinksListActions;
