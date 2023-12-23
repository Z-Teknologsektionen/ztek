import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { objectId } from "../helpers/customZodTypes";
import {
  createZaloonenBookingSchema,
  updateZaloonenBookingSchema,
} from "../helpers/schemas/zaloonenBooking";

export const zaloonenBookingRouter = createTRPCRouter({
  getAllAsAdmin: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.zaloonenBooking.findMany({
      orderBy: [{ primaryStartDate: "desc" }],
      select: {
        id: true,
        eventName: true,
        eventDescription: true,
        organizerEmail: true,
        organizerName: true,
        organizerPhone: true,
        inChargeName: true,
        inChargeEmail: true,
        inChargePhone: true,
        primaryStartDate: true,
        primaryEndDate: true,
        secondaryStartDate: true,
        secondaryEndDate: true,
        hasServingPermit: true,
        status: true,
        updatedAt: true,
        updatedBy: true,
        createdAt: true,
      },
    });
  }),
  getOneByEventName: publicProcedure
    .input(z.object({ eventName: z.string().min(1) }))
    .query(({ ctx, input: { eventName } }) => {
      return ctx.prisma.zaloonenBooking.findFirstOrThrow({
        where: {
          eventName,
        },
      });
    }),
  createZaloonenBooking: publicProcedure
    .input(createZaloonenBookingSchema)
    .mutation(
      ({
        ctx,
        input: {
          eventName,
          eventDescription,
          organizerName,
          organizerPhone,
          organizerEmail,
          inChargeName,
          inChargeEmail,
          inChargePhone,
          primaryStartDate,
          primaryEndDate,
          secondaryStartDate,
          secondaryEndDate,
          hasServingPermit,
        },
      }) => {
        return ctx.prisma.zaloonenBooking.create({
          data: {
            eventName,
            eventDescription,
            organizerName,
            organizerPhone,
            organizerEmail,
            inChargeName,
            inChargeEmail,
            inChargePhone,
            primaryStartDate,
            primaryEndDate,
            secondaryStartDate,
            secondaryEndDate,
            hasServingPermit,
          },
        });
      },
    ),
  updateOneAsAdmin: adminProcedure
    .input(updateZaloonenBookingSchema)
    .mutation(
      ({
        ctx,
        input: {
          id,
          eventName,
          eventDescription,
          organizerName,
          organizerPhone,
          organizerEmail,
          inChargeName,
          inChargeEmail,
          inChargePhone,
          primaryStartDate,
          primaryEndDate,
          secondaryStartDate,
          secondaryEndDate,
          hasServingPermit,
        },
      }) => {
        return ctx.prisma.zaloonenBooking.update({
          where: { id },
          data: {
            eventName,
            eventDescription,
            organizerName,
            organizerPhone,
            organizerEmail,
            inChargeName,
            inChargeEmail,
            inChargePhone,
            primaryStartDate,
            primaryEndDate,
            secondaryStartDate,
            secondaryEndDate,
            hasServingPermit,
          },
        });
      },
    ),
  deleteZaloonenBooking: adminProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.zaloonenBooking.delete({
        where: {
          id,
        },
      });
    }),
});
