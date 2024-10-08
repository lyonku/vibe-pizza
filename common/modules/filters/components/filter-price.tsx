import { Input, RangeSlider } from "@/common/ui";
import { ChangeEvent, FC } from "react";

interface FilterPriceProps {
  priceFrom?: number;
  priceTo?: number;
  setPrice: (e: ChangeEvent<HTMLInputElement>) => void;
  setRangePrice: ([priceFrom, priceTo]: number[]) => void;
}

export const FilterPrice: FC<FilterPriceProps> = ({ priceFrom, priceTo, setPrice, setRangePrice }) => {
  return (
    <div className="flex flex-col gap-4 border-y border-y-neutral-100 py-6 pb-7">
      <p className="font-bold ">Цена от и до:</p>
      <div className="flex gap-3">
        <Input
          type="number"
          id="priceFrom"
          placeholder="0"
          min={0}
          max={1500}
          value={String(priceFrom)}
          onChange={setPrice}
        />
        <Input
          type="number"
          id="priceTo"
          placeholder="1500"
          min={100}
          max={1500}
          value={String(priceTo)}
          onChange={setPrice}
        />
      </div>

      <RangeSlider
        min={0}
        max={1500}
        step={10}
        value={[priceFrom || 0, priceTo || 1500]}
        onValueChange={setRangePrice}
      />
    </div>
  );
};
