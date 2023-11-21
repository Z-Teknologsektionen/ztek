import type { FC } from "react";
import { useRef } from "react";
import { ErrorIcon, toast } from "react-hot-toast";
import Modal from "~/components/layout/Modal";
import { api } from "~/utils/api";
import { DocumentWizardForm } from "./DocumentWizardForm";

interface IUpdateDocumentWizard {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateDocumentWizard: FC<IUpdateDocumentWizard> = ({
  id,
  isOpen,
  onClose,
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const isPDFRef = useRef<HTMLInputElement>(null);
  const groupIdRef = useRef<HTMLSelectElement>(null);

  const ctx = api.useContext();

  api.document.getOne.useQuery(
    { id: id },
    {
      onSettled: () => toast.remove("gettingDocumentData"),
      onError: () => {
        if (isOpen) {
          toast.error("Fel när data skulle hämtas. Försök igen senare!");
        }
      },
      onSuccess: (data) => {
        toast.success("Hämtat nuvarande information");
        if (titleRef.current) titleRef.current.value = data.title;
        if (urlRef.current) urlRef.current.value = data.url;
        if (isPDFRef.current) isPDFRef.current.checked = data.isPDF;
        if (groupIdRef.current) groupIdRef.current.value = data.groupId;
      },
    },
  );

  const { mutate: updateDocument } = api.document.updateOne.useMutation({
    onMutate: () => toast.loading("Uppdaterar dokument..."),
    onSettled: (_data, _error, _variables, context) => toast.remove(context),
    onSuccess: () => {
      void ctx.document.invalidate();

      if (titleRef.current) titleRef.current.value = "";
      if (urlRef.current) urlRef.current.value = "";
      if (isPDFRef.current) isPDFRef.current.value = "";
      if (groupIdRef.current) groupIdRef.current.value = "";

      toast.success("Dokument uppdaterar!");
      onClose();
    },
    onError: (e) => {
      const errorMessage = JSON.stringify(e.data?.zodError, null, 2);
      if (errorMessage) {
        toast(
          (t) => (
            <button className="text-left" onClick={() => toast.dismiss(t.id)}>
              <pre>{errorMessage}</pre>
            </button>
          ),
          { icon: <ErrorIcon />, style: { maxWidth: "100vw" } },
        );
      } else {
        toast.error(
          e.data
            ? `HTTP Error: ${e.data.httpStatus} ${e.data.code}`
            : "Okänt fel",
        );
      }
    },
  });

  return (
    <Modal
      buttonText="Uppdatera"
      isOpen={isOpen}
      onClose={() => onClose()}
      onSubmit={() =>
        updateDocument({
          id: id,
          groupId: groupIdRef.current?.value ?? "",
          title: titleRef.current?.value ?? "",
          url: urlRef.current?.value ?? "",
          isPDF: isPDFRef.current?.checked,
        })
      }
      title="Uppdatera dokument"
    >
      <DocumentWizardForm
        groupIdRef={groupIdRef}
        isPDFRef={isPDFRef}
        titleRef={titleRef}
        urlRef={urlRef}
      />
    </Modal>
  );
};
