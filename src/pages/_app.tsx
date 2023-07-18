import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import Footer from "~/components/layout/Footer";
import HeadLayout from "~/components/layout/HeadLayout";
import Navbar from "~/components/layout/Navbar";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType<{
  session: Session;
}> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster position="top-center" reverseOrder={false} />
      <HeadLayout description="bla bla"></HeadLayout>
      <div className="zWhite flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
