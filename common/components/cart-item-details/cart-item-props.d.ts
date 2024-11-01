export interface CartItemProps {
  productId: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  details: { desc: string; additives: string; removedIngredinets: string };
  disabled: boolean | undefined;
  onClickRemove: () => void;
  onClickCountButton: (type: "plus" | "minus") => void;
}
