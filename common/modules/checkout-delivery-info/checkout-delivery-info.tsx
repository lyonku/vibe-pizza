import { FormAddressInput, FormTextarea } from "@/common/components/form";
import { ContentBlock } from "@/common/ui";
import { FC } from "react";

interface CheckoutDeliveryInfoProps {
  className?: string;
}

export const CheckoutDeliveryInfo: FC<CheckoutDeliveryInfoProps> = ({ className }) => {
  return (
    <ContentBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <FormAddressInput name="address" label="Адрес" required />

        <FormTextarea rows={5} name="comments" label="Комментарий к заказу" />
      </div>
    </ContentBlock>
  );
};
