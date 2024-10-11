import { FormInput } from "@/common/components/form";
import { ContentBlock } from "@/common/ui";
import { FC } from "react";

interface CheckoutPersonalInfoProps {
  className?: string;
}

export const CheckoutPersonalInfo: FC<CheckoutPersonalInfoProps> = ({ className }) => {
  return (
    <ContentBlock title="2. Персональная информация" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" label="Имя" placeholder="" required />
        <FormInput name="lastName" label="Фамилия" required />
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="phone" label="Телефон" type="tel" required />
      </div>
    </ContentBlock>
  );
};
