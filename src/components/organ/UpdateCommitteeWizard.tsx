import type { ChangeEvent, FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import CommitteeImage from "~/components/organ/CommitteeImage";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface IUpdateCommitteeWizard {
  committee: RouterOutputs["committee"]["getOneByEmail"];
  refetchCommittee: () => void;
}
export const UpdateCommitteeWizard: FC<IUpdateCommitteeWizard> = ({
  committee,
  refetchCommittee,
}) => {
  const { mutate: updateCommittee } =
    api.committee.updateCommitteeAsUser.useMutation({
      onSettled: () => refetchCommittee(),
    });

  const [previewImage, setPreviewImage] = useState("");
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setPreviewImage(committee?.image || "");
  }, [committee?.image]);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    Resizer.imageFileResizer(
      file,
      300,
      300,
      "WEBP",
      95,
      0,
      (uri) => {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        setPreviewImage(uri.toString());
      },
      "base64",
      300,
      300,
    );

    setTimeout(() => (e.target.value = ""), 2500);
  }, []);

  const handleCommitteeUpdate = useCallback(() => {
    if (!committee?.id) return;
    updateCommittee({
      id: committee?.id,
      description: descriptionRef.current?.value,
      image: previewImage,
    });
  }, [committee?.id, previewImage, updateCommittee]);
  return (
    <div className="flex w-full flex-row justify-start gap-2">
      <div className="space-y-2 rounded border p-2 shadow">
        <CommitteeImage alt="" className="mx-auto " filename={previewImage} />
        <input className="block w-48" onChange={handleFileChange} type="file" />
        <input
          className="block w-full rounded border-2 bg-zLightGray p-1"
          onClick={() => setPreviewImage("")}
          type="button"
          value="Radera bild"
        />
      </div>
      <div className="flex h-[354px] flex-grow flex-col gap-2">
        <textarea
          ref={descriptionRef}
          className="block w-full flex-grow resize-none rounded border-2 p-1"
          defaultValue={committee.description}
        ></textarea>
        <button
          className="bg-z w-full rounded border-2 p-1 hover:bg-slate-50"
          onClick={handleCommitteeUpdate}
          type="button"
        >
          Spara
        </button>
      </div>
    </div>
  );
};
