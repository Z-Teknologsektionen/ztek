import type { FC, RefObject } from "react";
import { api } from "~/utils/api";

interface IOrganWizardForm {
  committeeIdRef: RefObject<HTMLSelectElement>;
  emailRef: RefObject<HTMLInputElement>;
  nameRef: RefObject<HTMLInputElement>;
  nickNameRef: RefObject<HTMLInputElement>;
  orderRef: RefObject<HTMLInputElement>;
  phoneRef: RefObject<HTMLInputElement>;
  roleRef: RefObject<HTMLInputElement>;
}

export const MemberWizardForm: FC<IOrganWizardForm> = ({
  committeeIdRef,
  emailRef,
  nameRef,
  nickNameRef,
  orderRef,
  roleRef,
  phoneRef,
}) => {
  const { data: allCommittees } = api.committee.getAllAsAdmin.useQuery();

  return (
    <form className="mx-auto my-8 flex max-w-3xl flex-col gap-2">
      <select
        ref={committeeIdRef}
        className="rounded border-2 p-1 shadow"
        defaultValue=""
      >
        <option value="" disabled>
          Välj organ
        </option>
        {allCommittees &&
          allCommittees.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
      </select>
      <input
        ref={nameRef}
        className="rounded border-2 p-1 shadow"
        placeholder="Namn"
        type="text"
      />
      <input
        ref={nickNameRef}
        className="rounded border-2 p-1 shadow"
        placeholder="Kommitté namn"
        type="text"
      />
      <input
        ref={emailRef}
        className="rounded border-2 p-1 shadow"
        placeholder="Epost"
        type="email"
      />
      <input
        ref={phoneRef}
        className="rounded border-2 p-1 shadow"
        placeholder="Telefon"
        type="tel"
      />
      <input
        ref={roleRef}
        className="rounded border-2 p-1 shadow"
        placeholder="Roll"
        type="text"
      />
      <input
        ref={orderRef}
        className="rounded border-2 p-1 shadow"
        max={99}
        min={0}
        placeholder="Ordning"
        type="number"
      />
    </form>
  );
};
