import { type NextPage } from "next";
import type { FC } from "react";

const HomePage: NextPage = () => {
  return (
    <>
      <TempHeader />
      <div>Här finns inget :)</div>
      <TempFooter />
    </>
  );
};

export default HomePage;

export const TempHeader: FC = () => (
  <header className="h-14 bg-red-500"></header>
);

export const TempFooter: FC = () => (
  <footer className="h-96 bg-red-500"></footer>
);
