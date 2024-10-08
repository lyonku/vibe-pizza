import { cn } from "@/common/lib/utils";

interface Props {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
  return <strong className={cn("font-bold", className)}>{value} ₽</strong>;
};
