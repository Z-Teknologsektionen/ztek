import type { FC } from "react";
import { toast } from "react-hot-toast";
import Modal from "~/components/layout/Modal";
import { api } from "~/utils/api";

interface IDeleteOraganWizard {
  close: () => void;
  id: string;
  isOpen: boolean;
}

export const DeleteOraganWizard: FC<IDeleteOraganWizard> = ({
  close,
  id,
  isOpen,
}) => {
  const ctx = api.useContext();

  const { mutate: deleteMember } = api.member.deleteMember.useMutation({
    onMutate: () => toast.loading("Raderar medlem"),
    onSettled: (_c, _d, _e, toastId) => {
      void ctx.member.getAllMembersAsAdmin.invalidate();
      toast.remove(toastId);
      close();
    },
    onError: () => toast.error("Okänt fel. Försök igen senare!"),
    onSuccess: () => toast.success("Medlem har raderats!"),
  });

  return (
    <Modal
      buttonText="Radera"
      isOpen={isOpen}
      onClose={() => close()}
      onSubmit={() => deleteMember({ id })}
      title="Radera Organ"
    >
      <div className="mx-auto w-fit max-w-prose">
        <p>Är du säker på att du vill radera organet?</p>
        <p>Denna ändring går inte att ångra!</p>
      </div>
    </Modal>
  );
};
