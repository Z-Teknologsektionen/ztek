import { createCourseSchema } from "~/schemas/course";
import { courseProcedure, createTRPCRouter } from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getAllCoursesAsAuthed: courseProcedure.query(({ ctx }) => {
    return ctx.prisma.course.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        code: true,
        credits: true,
        year: true,
        courseId: true,
        documents: true,
        examiner: true,
        examinationType: true,
        successor: {
          select: {
            name: true,
            code: true,
          },
        },
        predecessor: {
          select: {
            name: true,
            code: true,
          },
        },
      },
    });
  }),
  createCourseAsAuthed: courseProcedure
    .input(createCourseSchema)
    .mutation(
      async ({
        ctx,
        input: {
          name,
          description,
          code,
          credits,
          year,
          courseId,
          studyPeriod,
          examiner,
          examinationType,
          successorId,
        },
      }) => {
        const createdCourse = await ctx.prisma.course.create({
          data: {
            name,
            description,
            code,
            courseId,
            credits,
            examinationType,
            examiner,
            year,
            studyPeriod,
            successorId,
          },

          select: {
            code: true,
            name: true,
          },
        });
        return createdCourse;
      },
    ),
});
