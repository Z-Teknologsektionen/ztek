import { AccountRoles, ZaloonenBookingStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import mongoose from "mongoose";
import { env } from "process";
import { z } from "zod";
import { objectId } from "~/schemas/helpers/custom-zod-helpers";
import {
  updateBookingInspectorAsAuthed,
  updateBookingStatusAsAuthed,
  upsertZaloonenBookingSchema,
  zaloonenBookingHashSchema,
} from "~/schemas/zaloonen-booking";
import {
  generateZaloonenBookingHash,
  validateZaloonenBookingHash,
} from "~/server/api/helpers/zaloonen-booking";
import {
  createTRPCRouter,
  publicProcedure,
  zaloonenProcedure,
  zaloonenProcedureWithHash,
} from "~/server/api/trpc";
import { sendPartyNotice } from "~/utils/send-party-notice";

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
          primaryDate,
          bookEvenIfColision,
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
          const collidingBookings = await prisma.zaloonenBooking.findMany({
            where: {
              OR: [
                {
                  // Bokingen startar under denna bokningen
                  startDateTime: {
                    lte: primaryDate.endDate,
                    gte: primaryDate.startDate,
                  },
                },
                {
                  // Bokingen slutar under denna bokningen
                  endDateTime: {
                    lte: primaryDate.endDate,
                    gte: primaryDate.startDate,
                  },
                },
                {
                  // Bokingen pågår under hela denna bokningen
                  endDateTime: {
                    gte: primaryDate.endDate,
                  },
                  startDateTime: {
                    lte: primaryDate.startDate,
                  },
                },
              ],
              id: { not: bookingId },
              bookingStatus:
                ZaloonenBookingStatus.APPROVED as ZaloonenBookingStatus,
            },
          });

          if (collidingBookings.length > 0) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Krockar med en redan godkänd bokning",
            });
          }
        }

        // TODO: Fundera på om krockar ska lagras i DB eller inte kanske inte värt med tänkte på hur snabbt beräkningarna går trots allt
        // TODO: Skicka mail om att bokningen har skapats och kanske även om den uppdaterats

        const res = await prisma.zaloonenBooking.upsert({
          where: {
            id: bookingId || new mongoose.Types.ObjectId().toString(), //Upsert klarar för tillfället inte att alla i where är undefined så skapar ett nytt object id som garanterat inte finns i DB
          },
          create: {
            ...data,
            startDateTime: primaryDate.startDate,
            endDateTime: primaryDate.endDate,
            updatedById: session?.user.memberId ?? null,
          },
          update: {
            ...data,
            startDateTime: primaryDate.startDate,
            endDateTime: primaryDate.endDate,
            updatedById: session?.user.memberId ?? null,
          },
        });

        res.hash = generateZaloonenBookingHash({
          id: res.id,
          createdAt: res.createdAt,
        });
        return await prisma.zaloonenBooking.update({
          where: {
            id: res.id,
          },
          data: {
            hash: res.hash,
          },
        });
      },
    ),
  updateZaloonenBookingStatusAsAuthed: zaloonenProcedure
    .input(updateBookingStatusAsAuthed)
    .mutation(
      async ({ ctx: { prisma, session }, input: { id, bookingStatus } }) => {
        // const booking = await prisma.zaloonenBooking
        //   .findUniqueOrThrow({ where: { id: id } })
        //   .catch(() => {
        //     throw new TRPCError({
        //       message: "Kunde inte hitta bokningen du ville uppdatera",
        //       code: "BAD_REQUEST",
        //     });
        //   });

        if (!bookingStatus) {
          throw new TRPCError({
            message: "Kunde inte uppdatera bokingens status.",
            code: "BAD_REQUEST",
          });
        }

        if (bookingStatus === ZaloonenBookingStatus.DENIED) {
          //TOOD: Skika mail om att bokningen inte godkänd
        }

        if (bookingStatus === ZaloonenBookingStatus.APPROVED) {
          //TODO: Skicka mail om att bokningen är godkänd på första datummet
        }

        return prisma.zaloonenBooking.update({
          where: {
            id: id,
          },
          data: {
            bookingStatus: bookingStatus,
            updatedById: session.user.memberId,
          },
        });
      },
    ),

  deleteBookingWithIdAndHash: publicProcedure
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
  deleteBookingAsAuthed: zaloonenProcedure
    .input(z.object({ id: objectId }))
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.zaloonenBooking.delete({
        where: { id },
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

  sendZaloonenPartyNotice: zaloonenProcedure
    .input(z.object({ id: objectId }))
    .mutation(async ({ ctx: { prisma }, input: { id } }) => {
      const booking = await prisma.zaloonenBooking.findUnique({
        where: { id },
      });

      if (!booking) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Kunde inte hitta bokningen",
        });
      }

      if (booking.partyNoticeSent) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Festanmälan har redan skickats",
        });
      }

      if (booking.bookingStatus !== ZaloonenBookingStatus.APPROVED) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Bokningen har inte status: APPROVED",
        });
      }

      //Send the party notice

      if (env.NODE_ENV === "production") {
        //TODO: Skicka festanmälan
        //TODO: Ska detta verkligen göras om man bara lånar typ värmeskåp eller lagar mat i Zaloonen??
        await sendPartyNotice({
          ...booking,
          endDate: booking.endDateTime,
          startDate: booking.endDateTime,
        }).catch((error: Error) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        });
      } else {
        // eslint-disable-next-line no-console
        console.log("FAKE: Skickar festanmälan");
      }

      return await prisma.zaloonenBooking.update({
        where: {
          id: id,
        },
        data: {
          partyNoticeSent: true,
        },
      });
    }),

  updateZaloonenBookingInspectorAsAuthed: zaloonenProcedure
    .input(updateBookingInspectorAsAuthed)
    .mutation(
      async ({
        ctx: { prisma, session },
        input: { id, bookingInspectorId },
      }) => {
        //TODO: Add booking to calendar
        return prisma.zaloonenBooking.update({
          where: {
            id: id,
          },
          data: {
            bookingInspectorId: bookingInspectorId,
            updatedById: session.user.memberId,
          },
        });
      },
    ),

  getAllBookingInspectorsAsAuthed: zaloonenProcedure.query(
    async ({ ctx: { prisma } }) => {
      return await prisma.user.findMany({
        where: {
          roles: {
            has: AccountRoles.MODIFY_ZALOONEN_BOOKING,
          },
        },
        select: {
          committeeMembers: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    },
  ),
});
