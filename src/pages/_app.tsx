import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import Footer from "~/components/layout/footer";
import HeadLayout from "~/components/layout/head-layout";
import Navbar from "~/components/layout/navbar";
import { TooltipProvider } from "~/components/ui/tooltip";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType<{
  session: Session;
}> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster position="top-center" reverseOrder={false} />
      <HeadLayout description="Z-teknologsektionens hemsida"></HeadLayout>
      <div className="zWhite flex min-h-screen flex-col">
        <TooltipProvider delayDuration={500}>
          <Navbar />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </TooltipProvider>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
