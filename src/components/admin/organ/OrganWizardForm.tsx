import type { FC, RefObject } from "react";

interface IOrganWizardForm {
  descRef: RefObject<HTMLTextAreaElement>;
  emailRef: RefObject<HTMLInputElement>;
  nameRef: RefObject<HTMLInputElement>;
  orderRef: RefObject<HTMLInputElement>;
  roleRef: RefObject<HTMLInputElement>;
  slugRef: RefObject<HTMLInputElement>;
}

export const OrganWizardForm: FC<IOrganWizardForm> = ({
  descRef,
  emailRef,
  nameRef,
  orderRef,
  roleRef,
  slugRef,
}) => {
  return (
    <form className="mx-auto my-8 flex max-w-3xl flex-col gap-2">
      <input
        ref={nameRef}
        className="rounded border-2 p-1 shadow"
        placeholder="Namn"
        type="text"
      />
      <input
        ref={slugRef}
        className="rounded border-2 p-1 shadow"
        placeholder="slug (utan specialtecken)"
        type="text"
      />
      <textarea
        ref={descRef}
        className="h-32 resize-none rounded border-2 p-1 shadow"
        placeholder="Beskrivning"
      ></textarea>
      <input
        ref={roleRef}
        className="rounded border-2 p-1 shadow"
        placeholder="Roll"
        type="text"
      />
      <input
        ref={emailRef}
        className="rounded border-2 p-1 shadow"
        placeholder="Epost"
        type="email"
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
