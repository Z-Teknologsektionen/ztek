import type { FC } from "react";
import { useRef } from "react";
import { ErrorIcon, toast } from "react-hot-toast";
import Modal from "~/components/layout/Modal";
import { api } from "~/utils/api";
import { OrganWizardForm } from "./OrganWizardForm";

interface IUpdateOrganWizard {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
}

export const UpdateOrganWizard: FC<IUpdateOrganWizard> = ({
  onClose,
  isOpen,
  slug,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const orderRef = useRef<HTMLInputElement>(null);
  const electionRef = useRef<HTMLInputElement>(null);

  const ctx = api.useContext();

  const { data: committee } = api.committee.getOneBySlugAsAdmin.useQuery(
    {
      slug,
    },
    {
      onSettled: () => toast.remove("gettingCommitteeData"),
      onError: () => {
        if (isOpen) {
          toast.error("Fel när data skulle hämtas. Försök igen senare!");
        }
      },
      onSuccess: (data) => {
        toast.success("Hämtat nuvarande information");
        if (nameRef.current) nameRef.current.value = data.name;
        if (slugRef.current) slugRef.current.value = data.slug;
        if (descRef.current) descRef.current.value = data.description;
        if (roleRef.current) roleRef.current.value = data.role;
        if (emailRef.current) emailRef.current.value = data.email;
        if (orderRef.current) orderRef.current.valueAsNumber = data.order;
        if (electionRef.current)
          electionRef.current.valueAsNumber = data.electionPeriod;
      },
    }
  );
  const { mutate: updateCommittee } = api.committee.updateCommittee.useMutation(
    {
      onMutate: () => toast.loading("Uppdaterar kommitté..."),
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
            { icon: <ErrorIcon /> }
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
        void ctx.committee.getOneBySlugAsAdmin.invalidate();
        void ctx.committee.getAllAsAdmin.invalidate();
        toast.success("Updaterat kommitté");
        close();
      },
    }
  );

  const handleFormSubmit = (): void => {
    updateCommittee({
      id: committee?.id || "",
      description: descRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      name: nameRef.current?.value ?? "",
      order: orderRef.current?.valueAsNumber ?? 0,
      role: roleRef.current?.value ?? "",
      slug: slugRef.current?.value ?? "",
    });
  };

  return (
    <Modal
      buttonText="Updatera"
      isOpen={isOpen}
      onClose={() => onClose()}
      onSubmit={() => {
        void handleFormSubmit();
      }}
      title={`Updatera ${committee?.name || ""}`}
    >
      <OrganWizardForm
        descRef={descRef}
        electionRef={electionRef}
        emailRef={emailRef}
        nameRef={nameRef}
        orderRef={orderRef}
        roleRef={roleRef}
        slugRef={slugRef}
      />
    </Modal>
  );
};
