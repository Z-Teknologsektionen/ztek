import { z } from "zod";
import { nonEmptyString, objectId } from "~/server/api/helpers/customZodTypes";

const MeetingElectionCandidateSchema = z.object({
  meetingElectionId: objectId,
  name: nonEmptyString,
  role: nonEmptyString,
});

export const createMeetingElectionSchema = z.object({
  title: nonEmptyString,
  slug: nonEmptyString,
  year: z
    .number()
    .min(
      2000,
      "Årtalet behöver vara före 2000, om det behöver läggas in från ett tidigare år behöver du kontakta webbgruppen",
    )
    .max(9999, "Årtalet måste vara ett 4 siffrigt tal")
    .refine(
      (val) => val <= new Date().getFullYear(),
      "Årtalet får inte vara ett framtida årtal",
    ),
  meeting: z.number().min(1).max(4).default(1),
  eligibleVoters: z.array(z.string()).default([]),
  candidates: z.array(MeetingElectionCandidateSchema).default([]),
});

export const updateMeetingElectionSchema = createMeetingElectionSchema
  .partial()
  .extend({ id: objectId });
