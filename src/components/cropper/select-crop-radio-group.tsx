import type { FC, MutableRefObject } from "react";
import type { PercentCrop } from "react-image-crop";
import { makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

type SelectCropRadioGroupProps = {
  crop: PercentCrop;
  imgRef: MutableRefObject<HTMLImageElement | null>;
  setAspectRatio: (ratio: number | undefined) => void;
  setCrop: (crop: PercentCrop) => void;
};

export const SelectCropRadioGroup: FC<SelectCropRadioGroupProps> = ({
  crop,
  imgRef,
  setAspectRatio,
  setCrop,
}) => {
  return (
    <RadioGroup
      className="flex flex-row items-center justify-center gap-4"
      defaultValue="free"
      onValueChange={(value) => {
        if (value.includes("/") && value.split("/").length === 2) {
          const [num1, num2] = value.split("/") as [string, string];
          setAspectRatio(Number(num1) / Number(num2));

          if (imgRef.current === null) return;

          setCrop(
            makeAspectCrop(
              crop,
              Number(num1) / Number(num2),
              imgRef.current.width,
              imgRef.current.height,
            ),
          );
        } else {
          setAspectRatio(undefined);
        }
      }}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="free" value="free" />
        <Label htmlFor="free">Fri</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="1/1" value="1/1" />
        <Label htmlFor="1/1">1:1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="5/4" value="5/4" />
        <Label htmlFor="5/4">5:4</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="4/3" value="4/3" />
        <Label htmlFor="4/3">4:3</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="16/9" value="16/9" />
        <Label htmlFor="16/9">16:9</Label>
      </div>
    </RadioGroup>
  );
};
