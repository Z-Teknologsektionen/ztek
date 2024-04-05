import { TRPCError } from "@trpc/server";
import mongoose from "mongoose";
import { env } from "process";
import {
  updateBookingAsAuthed,
  upsertZaloonenBookingSchema,
  zaloonenBookingHashSchema,
} from "~/schemas/zaloonen-booking";
import {
  getDateConflictIds,
  validateZaloonenBookingHash,
} from "~/server/api/helpers/zaloonen-booking";
import {
  createTRPCRouter,
  publicProcedure,
  zaloonenProcedure,
  zaloonenProcedureWithHash,
} from "~/server/api/trpc";
import { sendPartNotice } from "~/utils/send-party-notice";

export const zaloonenRouter = createTRPCRouter({
  getZaloonenBookingWithHash: zaloonenProcedureWithHash.query(
    ({ ctx: { booking } }) => {
      return booking;
    },
  ),
  upsertZaloonenBooking: publicProcedure
    .input(upsertZaloonenBookingSchema)
    .mutation(
      async ({
        ctx: { prisma, session },
        input: {
          id: bookingId,
          hash: bookingHash,
          bookEvenIfColision,
          dates: { primaryDate, secondaryDate },
          saveInformation: _saveInformation, // ZOD validerar denna så vi behöver inte göra något :)
          ...data
        },
      }) => {
        // Kolla om gammal eller ny bokning
        if (bookingId || bookingHash) {
          await validateZaloonenBookingHash({
            hash: bookingHash,
            id: bookingId,
            prisma,
          }).catch((error) => {
            if (error instanceof Error)
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: error.message,
              });
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Ogiltig input",
            });
          });
        }

        if (!bookEvenIfColision) {
          const { primaryDateConflictIds, secondaryDateConflictIds } =
            await getDateConflictIds({
              prisma: prisma,
              newBookingPrimaryStart: new Date(primaryDate.startDate),
              newBookingPrimaryEnd: new Date(primaryDate.endDate),
              newBookingSecondaryStart:
                secondaryDate.startDate !== null
                  ? new Date(secondaryDate.startDate)
                  : null,
              newBookingSecondaryEnd:
                secondaryDate.endDate !== null
                  ? new Date(secondaryDate.endDate)
                  : null,
            });

          if (primaryDateConflictIds.length > 0)
            throw new TRPCError({
              code: "CONFLICT",
              message:
                "Det finns redan en annan önskad bokning som krockar med förstahands datumet.\n Vill du boka ändå?",
            });

          if (secondaryDateConflictIds.length > 0)
            throw new TRPCError({
              code: "CONFLICT",
              message:
                "Det finns redan en annan önskad bokning som krockar andrahands datumet.\n Vill du boka ändå?",
            });
        }

        // TODO: Fundera på om krockar ska lagras i DB eller inte kanske inte värt med tänkte på hur snabbt beräkningarna går trots allt
        // TODO: Skicka mail om att bokningen har skapats och kanske även om den uppdaterats

        return prisma.zaloonenBooking.upsert({
          where: {
            id: bookingId || new mongoose.Types.ObjectId().toString(), //Upsert klarar för tillfället inte att alla i where är undefined så skapar ett nytt object id som garanterat inte finns i DB
          },
          create: {
            ...data,
            primaryEndDateTime: primaryDate.endDate,
            primaryStartDateTime: primaryDate.startDate,
            secondaryEndDateTime: secondaryDate.endDate,
            secondaryStartDateTime: secondaryDate.startDate,
            updatedById: session?.user.memberId ?? null,
            bookingStatus: "INITIAL",
            partyNoticeSent: false,
          },
          update: {
            ...data,
            primaryEndDateTime: primaryDate.endDate,
            primaryStartDateTime: primaryDate.startDate,
            secondaryEndDateTime: secondaryDate.endDate,
            secondaryStartDateTime: secondaryDate.startDate,
            updatedById: session?.user.memberId ?? null,
          },
        });
      },
    ),
  updateZaloonenBookingAsAuthed: zaloonenProcedure
    .input(updateBookingAsAuthed)
    .mutation(
      async ({ ctx: { prisma, session }, input: { id, bookingStatus } }) => {
        const booking = await prisma.zaloonenBooking
          .findUniqueOrThrow({ where: { id: id } })
          .catch(() => {
            throw new TRPCError({
              message: "Kunde inte hitta bokningen du ville uppdatera",
              code: "BAD_REQUEST",
            });
          });

        if (booking.bookingStatus !== "INITIAL")
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Du kan enbart ändra status på en bokning som inte har blivit rörd",
          });

        if (bookingStatus === "DENIED") {
          //TOOD: Skika mail om att bokningen inte godkänd
          return prisma.zaloonenBooking.update({
            where: {
              id: id,
            },
            data: {
              bookingStatus: bookingStatus,
              updatedById: session.user.memberId,
            },
          });
        }

        if (bookingStatus === "APPROVED_FIRST_DATETIME") {
          //TODO: Skicka mail om att bokningen är godkänd på första datummet
        }

        if (bookingStatus === "APPROVED_SECOND_DATETIME") {
          //TODO: Skicka mail om att bokningen är godkänd på andra datummet
        }

        const approvedStartDateTime =
          bookingStatus === "APPROVED_FIRST_DATETIME"
            ? booking.primaryStartDateTime
            : booking.secondaryStartDateTime;

        const approvedEndDateTime =
          bookingStatus === "APPROVED_FIRST_DATETIME"
            ? booking.primaryEndDateTime
            : booking.secondaryEndDateTime;

        if (approvedStartDateTime === null || approvedEndDateTime === null)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Du försöker godkänna en tid som inte är definerad. Kolla om allt ser rätt ut och försök igen!",
          });

        if (env.NODE_ENV === "production") {
          //TODO: Skicka festanmälan
          //TODO: Ska detta verkligen göras om man bara lånar typ värmeskåp eller lagar mat i Zaloonen??
          await sendPartNotice({
            ...booking,
            endDate: approvedEndDateTime,
            startDate: approvedStartDateTime,
          });
        }

        return prisma.zaloonenBooking.update({
          where: {
            id: id,
          },
          data: {
            bookingStatus: bookingStatus,
            updatedById: session.user.memberId,
            approvedEndDateTime: approvedEndDateTime,
            approvedStartDateTime: approvedStartDateTime,
          },
        });
      },
    ),
  deleteBookingWithHash: publicProcedure
    .input(zaloonenBookingHashSchema)
    .mutation(async ({ ctx: { prisma }, input }) => {
      await validateZaloonenBookingHash({
        hash: input.hash,
        id: input.id,
        prisma,
      }).catch((error) => {
        if (error instanceof Error)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        throw new TRPCError({ code: "BAD_REQUEST", message: "Ogiltig input" });
      });

      return prisma.zaloonenBooking.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getAllBookingsAsAuthed: zaloonenProcedure.query(
    async ({ ctx: { prisma } }) => {
      return await prisma.zaloonenBooking.findMany({
        include: {
          updatedBy: {
            select: {
              email: true,
              nickName: true,
              name: true,
            },
          },
        },
      });
    },
  ),
});
