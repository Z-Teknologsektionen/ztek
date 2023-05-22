import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import HeadLayout from "~/components/layout/HeadLayout";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType<{
  session: Session;
}> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster position="top-center" reverseOrder={false} />
      <HeadLayout description="bla bla"></HeadLayout>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
