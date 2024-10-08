import { cn } from "@/common/lib/utils";
import Image from "next/image";

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return <Image className={cn("h-[70px]", className)} src={src} alt="" width={70} height={70} />;
};
