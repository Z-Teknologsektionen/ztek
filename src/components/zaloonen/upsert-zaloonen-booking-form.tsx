import type { FC } from "react";
import toast from "react-hot-toast";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { useFormWithZodSchema } from "~/hooks/useFormWithZodSchema";
import { upsertZaloonenBookingSchema } from "~/schemas/zaloonen-booking";
import { api } from "~/utils/api";
import { customBookAnywayToast } from "./custom-book-anyway-toast";
import { UpsertZaloonenBookingFormDateSection } from "./upsert-zaloonen-booking-form-date-section";
import { UpsertZaloonenBookingFormEventSection } from "./upsert-zaloonen-booking-form-event-section";
import { UpsertZaloonenBookingFormPartySection } from "./upsert-zaloonen-booking-form-party-section";
import UpsertZaloonenBookingFormGDPRField from "./upsert-zaloonen-booking-from-gdpr-field";

type UpsertZaloonenBookingProps = {
  defaultValues?: z.infer<typeof upsertZaloonenBookingSchema>;
  formType: "create" | "update";
  hash?: string;
  id?: string;
};

export type UpsertZaloonenBookingSchemaType = Exclude<
  UpsertZaloonenBookingProps["defaultValues"],
  undefined
>;

const DEFAULT_VALUES: UpsertZaloonenBookingSchemaType = {
  bookingType: "" as "ALL",
  dates: {
    primaryDate: {
      endDate: "",
      startDate: "",
    },
    secondaryDate: {
      endDate: "",
      startDate: "",
    },
  },
  eventDescription: "",
  eventName: "",
  eventType: "" as "OFFICIAL",
  hasServingPermit: false,
  organizerEmail: "",
  organizerName: "",
  partyManagerEmail: "",
  partyManagerName: "",
  partyManagerPhone: "",
  saveInformation: false as true,
  bookEvenIfColision: false,
  hash: undefined,
  id: undefined,
};

const UpsertZaloonenBookingFormSection: FC<UpsertZaloonenBookingProps> = ({
  formType,
  defaultValues,
}) => {
  const form = useFormWithZodSchema({
    schema: upsertZaloonenBookingSchema,
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  const { mutate, isLoading } = api.zaloonen.upsertZaloonenBooking.useMutation({
    onMutate: () =>
      toast.loading(
        `${formType === "create" ? "Skapar" : "Updaterar"} bokning...`,
      ),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
    },
    onSuccess: () => {
      toast.success(
        `Din bokning har ${formType === "create" ? "skapats" : "updaterats"}!`,
      );
      //TODO: Skicka till ny skärm, visa ett boking skikat kort eller likande. Konstigt nu när formuläret är kvar för man vet inte riktigt vad som har hänt...
    },
    onError: (error, values) => {
      if (error.data && error.data.code === "CONFLICT") {
        customBookAnywayToast({
          message: error.message,
          onSubmit: () => mutate({ ...values, bookEvenIfColision: true }),
        });
      } else {
        toast.error(error.message);
      }
    },
  });

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardDescription>
          Observera att formuläret bara är en intresseanmälan! Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Omnis perferendis tempora ipsa
          labore nemo quibusdam repellendus sit nam quas maiores!
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
          onSubmit={form.handleSubmit((values) =>
            mutate({ ...values, bookEvenIfColision: false }),
          )}
        >
          {/* TODO: Kanske kan göras med tabs som "multipart" */}
          <CardContent className="mx-auto flex max-w-3xl flex-col gap-4">
            <UpsertZaloonenBookingFormEventSection form={form} />
            <UpsertZaloonenBookingFormDateSection form={form} />
            <UpsertZaloonenBookingFormPartySection form={form} />
            <UpsertZaloonenBookingFormGDPRField form={form} />
          </CardContent>
          <CardFooter className="mx-auto flex max-w-3xl flex-row justify-end gap-2">
            <Button
              disabled={isLoading}
              onClick={() => form.reset()}
              type="button"
              variant="outline"
            >
              Återställ
            </Button>
            <Button disabled={isLoading} type="submit" variant="default">
              {formType === "create" ? "Skicka" : "Updatera"} bokning
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default UpsertZaloonenBookingFormSection;
