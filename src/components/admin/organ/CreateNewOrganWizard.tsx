import type { FC } from "react";
import { useRef } from "react";
import { ErrorIcon, toast } from "react-hot-toast";
import Modal from "~/components/layout/Modal";
import { api } from "~/utils/api";
import { OrganWizardForm } from "./OrganWizardForm";

interface ICreateNewOrganWizard {
  close: () => void;
  isOpen: boolean;
}

export const CreateNewOrganWizard: FC<ICreateNewOrganWizard> = ({
  close,
  isOpen,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const orderRef = useRef<HTMLInputElement>(null);

  const ctx = api.useContext();

  const { mutate: createCommittee } = api.committee.createCommittee.useMutation(
    {
      onMutate: () => toast.loading("Skapar ny kommitté..."),
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
        void ctx.committee.getAllAsAdmin.invalidate();
        toast.success("Ny kommitté skapad!");
        close();
      },
    }
  );

  const handleFormSubmit = (): void => {
    try {
      createCommittee({
        description: descRef.current?.value ?? "",
        email: emailRef.current?.value ?? "",
        name: nameRef.current?.value ?? "",
        order: orderRef.current?.valueAsNumber ?? 0,
        role: roleRef.current?.value ?? "",
        slug: slugRef.current?.value ?? "",
      });

      if (nameRef.current) nameRef.current.value = "";
      if (slugRef.current) slugRef.current.value = "";
      if (descRef.current) descRef.current.value = "";
      if (roleRef.current) roleRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (orderRef.current) orderRef.current.value = "";
    } catch {
      return;
    }
  };

  return (
    <Modal
      buttonText="Skapa"
      isOpen={isOpen}
      onClose={() => close()}
      onSubmit={() => void handleFormSubmit()}
      title={"Lägg till organ"}
    >
      <OrganWizardForm
        descRef={descRef}
        emailRef={emailRef}
        nameRef={nameRef}
        orderRef={orderRef}
        roleRef={roleRef}
        slugRef={slugRef}
      />
    </Modal>
  );
};
