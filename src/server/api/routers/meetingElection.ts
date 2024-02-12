import { z } from "zod";
import { objectId } from "~/server/api/helpers/customZodTypes";
import {
  createTRPCRouter,
  meetingElectionProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  createMeetingElectionSchema,
  updateMeetingElectionSchema,
} from "../helpers/schemas/meetingElection";

export const meetingElectionRouter = createTRPCRouter({
  createOne: meetingElectionProcedure
    .input(createMeetingElectionSchema)
    .mutation(
      async ({ ctx, input: { title, year, eligibleVoters, meeting } }) => {
        return ctx.prisma.meetingElection.create({
          data: {
            title: title,
            year: year,
            eligableVoters: eligibleVoters,
            meeting: meeting,
          },
        });
      },
    ),
  updateOne: meetingElectionProcedure
    .input(updateMeetingElectionSchema)
    .mutation(
      async ({ ctx, input: { id, title, year, eligibleVoters, meeting } }) => {
        return ctx.prisma.meetingElection.update({
          where: {
            id: id,
          },
          data: {
            title: title,
            year: year,
            eligableVoters: eligibleVoters,
            meeting: meeting,
          },
        });
      },
    ),
  getAll: meetingElectionProcedure.query(async ({ ctx }) => {
    const meetingElections = await ctx.prisma.meetingElection.findMany({
      select: {
        id: true,
        title: true,
        year: true,
      },
      orderBy: [{ year: "desc" }],
    });
    return meetingElections;
  }),
  getOneById: publicProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .query(async ({ ctx, input: { id } }) => {
      return ctx.prisma.meetingElection.findFirstOrThrow({
        where: {
          id: id,
        },
        select: {
          id: true,
          title: true,
          year: true,
        },
      });
    }),
  deleteOne: meetingElectionProcedure
    .input(z.object({ id: objectId }))
    .mutation(async ({ ctx, input: { id } }) => {
      return ctx.prisma.meetingElection.delete({
        where: {
          id: id,
        },
      });
    }),
});
