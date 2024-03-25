import type {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from "react";

interface IBackgroundImageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

const BackgroundImage: FC<PropsWithChildren<IBackgroundImageProps>> = ({
  children,
  ...rest
}) => {
  return (
    <div
      style={{
        backgroundImage: `url('/Ztek_BG_2.svg')`,
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default BackgroundImage;
