import { Head, Html, Main, NextScript } from "next/document";
import type React from "react";

const Document = (): React.JSX.Element => {
  return (
    <Html className="scroll-smooth" lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
