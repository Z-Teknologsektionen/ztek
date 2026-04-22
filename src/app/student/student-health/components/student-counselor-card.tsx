import type { FC } from "react";
import { MdEmail, MdInfo } from "react-icons/md";
import SecondaryTitle from "~/components/layout/secondary-title";
import { cached } from "~/utils/server-side-cache";
import { caller } from "~/utils/trpc-client/caller";

const STUDENT_COUNSELOR_ROLE = "Studievägledare";

export const StudentCounselorCard: FC = async () => {
  const studentCounselor = await cached(caller.programBoard.getOneByRole, [
    "boardProgramMembers",
  ])({ role: STUDENT_COUNSELOR_ROLE });

  if (!studentCounselor) return null;

  return (
    <div className="col-span-1">
      <SecondaryTitle>Studievägledare {studentCounselor.name}</SecondaryTitle>
      <ul className="mt-6">
        <li className="mb-2 flex items-center justify-center md:justify-start">
          <MdEmail className="mr-2" />
          <a
            className="hover:underline"
            href={`mailto:${studentCounselor.email}`}
          >
            {studentCounselor.email}
          </a>
        </li>
        <li className="mb-2 flex items-center justify-center md:justify-start">
          <MdInfo className="mr-2" />
          <a
            className="hover:underline"
            href="https://www.chalmers.se/utbildning/studentstod/"
            target="_blank"
          >
            Mer information om studiestöd
          </a>
        </li>
      </ul>
    </div>
  );
};
