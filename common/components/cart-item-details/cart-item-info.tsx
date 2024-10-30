import { CartItemProps } from "./cart-item-props";

interface Props {
  name: string;
  details: CartItemProps["details"];
}

export const CartItemInfo: React.FC<Props> = ({ name, details }) => {
  return (
    <div className="flex flex-col gap-1">
      <strong className="text-lg font-bold flex-1 leading-6">{name}</strong>
      {details.desc && <p className="text-sm text-[#A1A1A1]">{details.desc}</p>}
      {details.additives && (
        <p className="text-sm text-[#A1A1A1]">
          <span className="text-green-600">+ </span>
          {details.additives}
        </p>
      )}
      {details.removedIngredinets && (
        <p className="text-sm text-[#A1A1A1]">
          <span className="text-red-600">- </span>
          {details.removedIngredinets}
        </p>
      )}
    </div>
  );
};
