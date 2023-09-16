import type { FC } from "react";
import { useRef } from "react";
import { ErrorIcon, toast } from "react-hot-toast";
import Modal from "~/components/layout/Modal";
import { api } from "~/utils/api";
import { DocumentGroupWizardForm } from "./DocumentGroupWizardForm";

interface IUpdateDocumentGroupWizard {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateDocumentGroupWizard: FC<IUpdateDocumentGroupWizard> = ({
  id,
  isOpen,
  onClose,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

  const ctx = api.useContext();

  api.document.getOneGroup.useQuery(
    { id: id },
    {
      onSettled: () => toast.remove("gettingGroupData"),
      onError: () => {
        if (isOpen) {
          toast.error("Fel när data skulle hämtas. Försök igen senare!");
        }
      },
      onSuccess: (data) => {
        toast.success("Hämtat nuvarande information");
        if (nameRef.current) nameRef.current.value = data.name;
        if (textRef.current) textRef.current.value = data.extraText;
      },
    }
  );

  const { mutate: updateDocument } = api.document.updateOneGroup.useMutation({
    onMutate: () => toast.loading("Uppdaterar grupp..."),
    onSettled: (_data, _error, _variables, context) => toast.remove(context),
    onSuccess: () => {
      void ctx.document.invalidate();

      if (nameRef.current) nameRef.current.value = "";
      if (textRef.current) textRef.current.value = "";

      toast.success("Grupp uppdaterad!");
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
      buttonText="Uppdatera"
      isOpen={isOpen}
      onClose={() => onClose()}
      onSubmit={() =>
        updateDocument({
          id: id,
          name: nameRef.current?.value,
          extraText: textRef.current?.value,
        })
      }
      title="Uppdatera grupp"
    >
      <DocumentGroupWizardForm nameRef={nameRef} textRef={textRef} />
    </Modal>
  );
};
