export interface CartItemProps {
  productId: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  details: string;
  disabled: boolean | undefined;
  onClickRemove: () => void;
  onClickCountButton: (type: "plus" | "minus") => void;
}
