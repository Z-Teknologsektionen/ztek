import type { Metadata } from "next";
import type { ReactElement } from "react";
import ExternalLinks from "./external-links";
import HomePageHeroSection from "./home-page-hero-section";
import HomePageNewStudentSection from "./home-page-new-student-section";
import HomePageSponsorSection from "./home-page-sponsor-section";

export const metadata: Metadata = {
  title: "Z",
};

const HomePage = (): ReactElement => {
  return (
    <div className="min-h-screen bg-zWhite font-sans text-zBlack">
      <HomePageHeroSection />
      <HomePageSponsorSection />
      <div className="mx-auto h-px w-8/12 bg-zLightGray" />
      <HomePageNewStudentSection />
      <ExternalLinks />
    </div>
  );
};

export default HomePage;
