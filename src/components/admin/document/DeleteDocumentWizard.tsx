import type { FC } from "react";
import { ErrorIcon, toast } from "react-hot-toast";
import Modal from "~/components/layout/Modal";
import { api } from "~/utils/api";

interface IDeleteDocumentWizard {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteDocumentWizard: FC<IDeleteDocumentWizard> = ({
  id,
  isOpen,
  onClose,
}) => {
  const ctx = api.useContext();

  const { mutate: deleteDocument } = api.document.deleteOne.useMutation({
    onMutate: () => toast.loading("Raderar document..."),
    onSettled: (_c, _d, _e, toastId) => {
      void ctx.document.invalidate();
      toast.remove(toastId);
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
          { icon: <ErrorIcon /> },
        );
      } else {
        toast.error(
          e.data
            ? `HTTP Error: ${e.data.httpStatus} ${e.data.code}`
            : "Okänt fel",
        );
      }
    },
    onSuccess: () => toast.success("Documentet har raderats"),
  });

  return (
    <Modal
      buttonText="Radera"
      isOpen={isOpen}
      onClose={() => onClose()}
      onSubmit={() => deleteDocument({ id: id })}
      title="Radera dokument"
    >
      <div className="mx-auto w-fit max-w-prose">
        <p>Är du säker på att du vill radera organet?</p>
        <p>Denna ändring går inte att ångra!</p>
      </div>
    </Modal>
  );
};
