interface Props {
  name: string;
  details: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details }) => {
  return (
    <div className="flex flex-col gap-1">
      <strong className="text-lg font-bold flex-1 leading-6">{name}</strong>
      {details && <p className="text-sm text-[#A1A1A1]">{details}</p>}
    </div>
  );
};
