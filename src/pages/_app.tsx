import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import Footer from "~/components/layout/footer";
import HeadLayout from "~/components/layout/head-layout";
import Navbar from "~/components/layout/navbar";
import "~/styles/globals.css";
import { TrpcProvider } from "~/utils/trpc/trpc-provider";

const MyApp: AppType<{
  session: Session;
}> = ({ Component, pageProps }) => {
  return (
    // Pages router (removal pending) does not use RootProviders component, though it logically should
    <SessionProvider session={pageProps.session}>
      <TrpcProvider>
        <Analytics mode="auto" />
        <SpeedInsights />
        <Toaster position="top-center" reverseOrder={false} />
        <HeadLayout description="Z-teknologsektionens hemsida"></HeadLayout>
        <div className="zWhite flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </TrpcProvider>
    </SessionProvider>
  );
};

export default MyApp;
