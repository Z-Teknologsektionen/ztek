import Head from "next/head";
import { type FC, type PropsWithChildren } from "react";

interface IHeadLayout {
  description?: string;
  title?: string;
}

const HeadLayout: FC<PropsWithChildren<IHeadLayout>> = ({
  description,
  title,
  children,
}) => {
  return (
    <Head>
      {title && <title>{`${title} | Automation och Mekatronik`}</title>}
      {description && <meta content={description} name="description" />}
      <link href={"/logo.png"} rel="icon" type="image/x-icon" />
      {children}
    </Head>
  );
};

export default HeadLayout;
