"use client";

import { useState, type FC } from "react";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { useSendEmail } from "~/hooks/mutations/useMutateEmail";
import { UpsertContactForm } from "./upsert-contact-form";

export const FooterContactSection: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: sendEmail } = useSendEmail({
    onSuccess: () => setIsOpen(false),
  });

  return (
    <div className="text-center text-xs">
      <p>Hemsidan är utvecklad av Webbgruppen, sektionens viktigaste organ.</p>
      <UpsertDialog
        description="Skriv din fråga här så svarar vi så snart vi kan. En kopia kommer också skickas till dig."
        form={
          <UpsertContactForm
            formType="create"
            onSubmit={(values) => {
              sendEmail(values);
            }}
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Kontakta Webbgruppen"
        trigger={
          <p className="m-0 cursor-pointer font-semibold hover:underline">
            Kontakta oss!
          </p>
        }
      />
    </div>
  );
};
