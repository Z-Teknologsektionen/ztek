import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { objectId } from "../helpers/customZodTypes";

export const zaloonenBookingRouter = createTRPCRouter({
  getAll: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.zaloonenBooking.findMany({
      orderBy: [{ createdAt: "desc" }],
      select: {
        id: true,
        eventName: true,
        eventDescription: true,
        organizerEmail: true,
        organizerPhone: true,
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
  createZaloonenBooking: publicProcedure
    .input(
      z.object({
        eventName: z.string().min(1),
        eventDescription: z.string().min(1),
        organizerName: z.string().min(1),
        organizerPhone: z.string().min(1),
        organizerEmail: z.string().email().min(1),
        inChargeName: z.string().min(1),
        inChargePhone: z.string().min(1),
        inChargeEmail: z.string().email().min(1),
        primaryStartDate: z.date().min(new Date()),
        primaryEndDate: z.date().min(new Date()),
        secondaryStartDate: z.date().min(new Date()),
        secondaryEndDate: z.date().min(new Date()),
        hasServingPermit: z.boolean(),
      }),
    )
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
