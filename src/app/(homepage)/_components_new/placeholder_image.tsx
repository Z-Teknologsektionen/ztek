import { Image as ImageIcon } from "lucide-react";

interface PlaceholderImageProps {
  label: string;
  className?: string;
}

export default function PlaceholderImage({ label, className = "" }: PlaceholderImageProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-neutral-400 bg-neutral-200 text-neutral-500 ${className}`}
    >
      <ImageIcon size={28} strokeWidth={1.5} />
      <span className="text-xs font-medium text-center px-3">{label}</span>
    </div>
  );
}