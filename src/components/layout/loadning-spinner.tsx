import type { FC } from "react";
import { PuffLoader } from "react-spinners";

const LoadningSpinner: FC = () => {
  return (
    <div className="grid place-content-center">
      <PuffLoader color="#888888" size={80} />;
    </div>
  );
};

export default LoadningSpinner;
