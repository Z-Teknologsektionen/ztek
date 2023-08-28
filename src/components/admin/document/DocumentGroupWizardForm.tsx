import type { FC, RefObject } from "react";

interface IDocumentGroupWizardForm {
  nameRef: RefObject<HTMLInputElement>;
  textRef: RefObject<HTMLInputElement>;
}
export const DocumentGroupWizardForm: FC<IDocumentGroupWizardForm> = ({
  nameRef,
  textRef,
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
        ref={textRef}
        className="rounded border-2 p-1 shadow"
        placeholder="Extra text"
        type="text"
      />
    </form>
  );
};
