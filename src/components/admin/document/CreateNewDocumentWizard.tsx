import type { FC } from "react";
import { useRef } from "react";
import { ErrorIcon, toast } from "react-hot-toast";
import Modal from "~/components/layout/Modal";
import { api } from "~/utils/api";
import { DocumentWizardForm } from "./DocumentWizardForm";

interface ICreateNewDocumentWizard {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateNewDocumentWizard: FC<ICreateNewDocumentWizard> = ({
  isOpen,
  onClose,
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const isPDFRef = useRef<HTMLInputElement>(null);
  const groupIdRef = useRef<HTMLSelectElement>(null);

  const ctx = api.useContext();

  const { mutate: createDocument } = api.document.createOne.useMutation({
    onMutate: () => toast.loading("Skapar nytt dokument..."),
    onSettled: (_data, _error, _variables, context) => toast.remove(context),
    onSuccess: () => {
      void ctx.document.invalidate();

      if (titleRef.current) titleRef.current.value = "";
      if (urlRef.current) urlRef.current.value = "";
      if (isPDFRef.current) isPDFRef.current.value = "";
      if (groupIdRef.current) groupIdRef.current.value = "";

      toast.success("Nytt dokument skapat!");
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
      buttonText="Skapa"
      isOpen={isOpen}
      onClose={() => onClose()}
      onSubmit={() =>
        createDocument({
          groupId: groupIdRef.current?.value ?? "",
          title: titleRef.current?.value ?? "",
          url: urlRef.current?.value ?? "",
          isPDF: isPDFRef.current?.checked,
        })
      }
      title="Skapa dokument"
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
