import type { FC } from "react";
import { useRef } from "react";
import { ErrorIcon, toast } from "react-hot-toast";
import Modal from "~/components/layout/Modal";
import { api } from "~/utils/api";
import { MemberWizardForm } from "./MemberWizardForm";

interface IUpdateMemberWizard {
  close: () => void;
  id: string;
  isOpen: boolean;
}

export const UpdateMemberWizard: FC<IUpdateMemberWizard> = ({
  close,
  isOpen,
  id,
}) => {
  const committeeIdRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const orderRef = useRef<HTMLInputElement>(null);

  const ctx = api.useContext();

  const { data: member } = api.member.getOneById.useQuery(
    {
      id,
    },
    {
      onSettled: () => toast.remove("gettingMemberData"),
      onError: () => {
        if (isOpen) {
          toast.error("Fel när data skulle hämtas. Försök igen senare!");
        }
      },
      onSuccess: (data) => {
        toast.success("Hämtat nuvarande information");

        if (nameRef.current) nameRef.current.value = data.name;
        if (nickNameRef.current) nickNameRef.current.value = data.nickName;
        if (committeeIdRef.current)
          committeeIdRef.current.value = data.committeeId;
        if (roleRef.current) roleRef.current.value = data.role;
        if (emailRef.current) emailRef.current.value = data.email;
        if (phoneRef.current) phoneRef.current.value = data.phone;
        if (orderRef.current) orderRef.current.valueAsNumber = data.order;
      },
    },
  );

  const { mutate: updateMember } = api.member.updateMemberAsAdmin.useMutation({
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
    onSuccess: () => {
      void ctx.member.getCommitteeMembersAsAdmin.invalidate();
      void ctx.member.getOneById.invalidate();
      toast.success("Uppdaterat medlem!");
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
    updateMember({
      id: member?.id ?? "",
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
      buttonText="Uppdatera"
      isOpen={isOpen}
      onClose={() => close()}
      onSubmit={() => void handleFormSubmit()}
      title={"Uppdatera medlem"}
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
