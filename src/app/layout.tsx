import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "~/components/layout/footer";
import "~/styles/globals.css";
import Navbar from "./components/navbar";
import RootProviders from "./providers";

export const metadata: Metadata = {
  title: {
    absolute: "Automation och Mekatronik",
    template: `%s | Automation och Mekatronik`,
  },
  description: "Z-teknologsektionens hemsida",
  icons: [
    {
      url: "/logo.png",
      rel: "icon",
      type: "image/x-icon",
    },
  ],
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html className="scroll-smooth" lang="sv">
      <body>
        <Analytics mode="auto" />
        <SpeedInsights />
        <Toaster position="top-center" reverseOrder={false} />
        <RootProviders>
          <div className="zWhite flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </RootProviders>
      </body>
    </html>
  );
};

export default RootLayout;
