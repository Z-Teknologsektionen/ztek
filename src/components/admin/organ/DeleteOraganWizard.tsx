import type { FC } from "react";
import { toast } from "react-hot-toast";
import Modal from "~/components/layout/Modal";
import { api } from "~/utils/api";

interface IDeleteOraganWizard {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteOraganWizard: FC<IDeleteOraganWizard> = ({
  onClose,
  id,
  isOpen,
}) => {
  const ctx = api.useContext();

  const { mutate: deleteCommittee } = api.committee.deleteCommittee.useMutation(
    {
      onMutate: () => toast.loading("Raderar organ"),
      onSettled: (_c, _d, _e, toastId) => {
        void ctx.committee.getAllAsAdmin.invalidate();
        toast.remove(toastId);
        close();
      },
      onError: () => toast.error("Okänt fel. Försök igen senare!"),
      onSuccess: () => toast.success("Organ har raderats!"),
    }
  );

  return (
    <Modal
      buttonText="Radera"
      isOpen={isOpen}
      onClose={() => onClose()}
      onSubmit={() => deleteCommittee({ id })}
      title="Radera Organ"
    >
      <div className="mx-auto w-fit max-w-prose">
        <p>Är du säker på att du vill radera organet?</p>
        <p>Denna ändring går inte att ångra!</p>
      </div>
    </Modal>
  );
};
