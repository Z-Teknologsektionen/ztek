import type { FC } from "react";
import { useRef } from "react";
import { ErrorIcon, toast } from "react-hot-toast";
import Modal from "~/components/layout/Modal";
import { api } from "~/utils/api";
import { MemberWizardForm } from "./MemberWizardForm";

interface ICreateNewMemberWizard {
  close: () => void;
  isOpen: boolean;
}

export const CreateNewMemberWizard: FC<ICreateNewMemberWizard> = ({
  close,
  isOpen,
}) => {
  const committeeIdRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const orderRef = useRef<HTMLInputElement>(null);

  const ctx = api.useContext();

  const { mutate: createMember } = api.member.createMember.useMutation({
    onMutate: () => toast.loading("Skapar ny medlem..."),
    onSettled: (_c, _e, _o, toastId) => toast.dismiss(toastId),
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
    onSuccess: () => {
      void ctx.member.getCommitteeMembersAsAdmin.invalidate();
      toast.success("Ny medlem skapad!");
      close();

      if (nameRef.current) nameRef.current.value = "";
      if (nickNameRef.current) nickNameRef.current.value = "";
      if (committeeIdRef.current) committeeIdRef.current.value = "";
      if (roleRef.current) roleRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (phoneRef.current) phoneRef.current.value = "";
      if (orderRef.current) orderRef.current.value = "";
    },
  });

  const handleFormSubmit = (): void => {
    createMember({
      committeeId: committeeIdRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      name: nameRef.current?.value,
      order: !Number.isNaN(orderRef.current?.valueAsNumber)
        ? orderRef.current?.valueAsNumber
        : undefined,
      role: roleRef.current?.value ?? "",
      nickName: nickNameRef.current?.value,
      phone:
        phoneRef.current?.value !== "" ? phoneRef.current?.value : undefined,
    });
  };

  return (
    <Modal
      buttonText="Skapa"
      isOpen={isOpen}
      onClose={() => close()}
      onSubmit={() => void handleFormSubmit()}
      title={"Skapa medlem"}
    >
      <MemberWizardForm
        committeeIdRef={committeeIdRef}
        emailRef={emailRef}
        nameRef={nameRef}
        nickNameRef={nickNameRef}
        orderRef={orderRef}
        phoneRef={phoneRef}
        roleRef={roleRef}
      />
    </Modal>
  );
};
