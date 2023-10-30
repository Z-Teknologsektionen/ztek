import type { FC } from "react";
import { useRef } from "react";
import { ErrorIcon, toast } from "react-hot-toast";
import Modal from "~/components/layout/Modal";
import { api } from "~/utils/api";
import { DocumentGroupWizardForm } from "./DocumentGroupWizardForm";

interface ICreateNewDocumentGroupWizard {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateNewDocumentGroupWizard: FC<
  ICreateNewDocumentGroupWizard
> = ({ isOpen, onClose }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

  const ctx = api.useContext();

  const { mutate: createDocument } = api.document.createOneGroup.useMutation({
    onMutate: () => toast.loading("Skapar ny grupp..."),
    onSettled: (_data, _error, _variables, context) => toast.remove(context),
    onSuccess: () => {
      void ctx.document.invalidate();

      if (nameRef.current) nameRef.current.value = "";
      if (textRef.current) textRef.current.value = "";

      toast.success("Ny grupp skapad!");
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
          { icon: <ErrorIcon />, style: { maxWidth: "100vw" } }
        );
      } else {
        toast.error(
          e.data
            ? `HTTP Error: ${e.data.httpStatus} ${e.data.code}`
            : "Okänt fel"
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
          name: nameRef.current?.value ?? "",
          extraText: textRef.current?.value,
        })
      }
      title="Skapa grupp"
    >
      <DocumentGroupWizardForm nameRef={nameRef} textRef={textRef} />
    </Modal>
  );
};
