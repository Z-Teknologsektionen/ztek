import { type FC } from "react";

type ImageCarouselArrowProps = {
  left?: boolean;
  onClick: React.MouseEventHandler<SVGSVGElement>;
};

const ImageCarouselArrow: FC<ImageCarouselArrowProps> = ({ onClick, left }) => {
  return (
    <svg
      className={`invisible absolute top-1/2 fill-white -translate-y-1/2 hover:cursor-pointer md:visible md:h-[30px] md:w-[30px] ${
        left ? "left-1" : "right-1"
      }`}
      onClick={onClick}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
};

export default ImageCarouselArrow;
