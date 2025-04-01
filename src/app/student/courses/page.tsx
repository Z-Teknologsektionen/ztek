import type { Metadata } from "next";
import type { FC } from "react";

export const metadata: Metadata = {
  title: "Ny student",
};

const CoursesPage: FC = () => {
  return (
    <div className="divide-y-4 divide-zDarkGray divide-opacity-20">
      <p>HELLO</p>
    </div>
  );
};

export default CoursesPage;
