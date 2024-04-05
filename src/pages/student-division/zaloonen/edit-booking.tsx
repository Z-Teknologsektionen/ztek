import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import HeadLayout from "~/components/layout/head-layout";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import UpsertZaloonenBookingFormSection from "~/components/zaloonen/upsert-zaloonen-booking-form";
import ssg from "~/server/api/helpers/ssg";
import { api } from "~/utils/api";

const EditZaloonenBooking: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ hash, id }) => {
  const {
    data: bookingValues,
    error: bookingFetchError,
    isError: isBookingFetchError,
    isLoading: isBookingFetchLoading,
  } = api.zaloonen.getZaloonenBookingWithHash.useQuery(
    { hash: hash, id: id },
    {
      retry: false,
    },
  );

  return (
    <>
      <HeadLayout title="Redigera bokning" />
      <SectionWrapper>
        <SectionTitle>Redigera bokning</SectionTitle>
        {/* TODO: Snyggare loadning state */}
        {isBookingFetchLoading && <div>Loadning...</div>}
        {/* TODO: Snyggare error state */}
        {isBookingFetchError && <p>Error: {bookingFetchError.message}</p>}
        {/* TODO: Behöver man godkänna GDPR även när man uppdaterar bokning?? */}
        {bookingValues && (
          <UpsertZaloonenBookingFormSection
            defaultValues={{
              hash: hash,
              ...bookingValues,
              bookEvenIfColision: false, // TODO: Ska den verkligen kolla detta om man bara försöker uppdatera sin boking isf kanske man ska kolla om man över huvudtaget försöker uppdatera en bokning eller inte
              saveInformation: false as true,
              dates: {
                primaryDate: {
                  endDate: bookingValues.primaryEndDateTime.toISOString(),
                  startDate: bookingValues.primaryStartDateTime.toISOString(),
                },
                secondaryDate: {
                  endDate: bookingValues.secondaryEndDateTime
                    ? bookingValues.secondaryEndDateTime.toISOString()
                    : bookingValues.secondaryEndDateTime,
                  startDate: bookingValues.secondaryStartDateTime
                    ? bookingValues.secondaryStartDateTime.toISOString()
                    : bookingValues.secondaryStartDateTime,
                },
              },
            }}
            formType="update"
          />
        )}
      </SectionWrapper>
    </>
  );
};

export default EditZaloonenBooking;

export const getServerSideProps: GetServerSideProps<
  { hash: string; id: string },
  { hash: string; id: string }
> = async ({ query }) => {
  const hash = query.hash as string;
  const id = query.id as string;

  await ssg.zaloonen.getZaloonenBookingWithHash.prefetch({
    id: id,
    hash: hash,
  });

  return {
    props: {
      hash: hash,
      id: id,
      trpcState: ssg.dehydrate(),
    },
  };
};
