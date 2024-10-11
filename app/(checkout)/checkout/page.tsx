"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Title } from "@/common/ui";
import { Container } from "@/common/components";
import { useCart } from "@/common/hooks/use-cart";
import { CheckoutCart } from "@/common/modules/checkout-cart";
import { CheckoutSidebar } from "@/common/modules/checkout-sidebar";
import { CheckoutPersonalInfo } from "@/common/modules/checkout-personal-info";
import { CheckoutDeliveryInfo } from "@/common/modules/checkout-delivery-info";
import { checkoutFormSchema, CheckoutFormType } from "@/common/schemas";

export default function CheckoutPage() {
  const { items, totalAmount, loading } = useCart(true);
  const isFirstLoading = loading && items.length === 0;

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = (data: CheckoutFormType) => {
    console.log(data);
  };

  return (
    <Container className="flex flex-col gap-12 pt-10">
      <Title text="Оформление заказа" size="lg" className="font-extrabold" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-10 mb-20">
          <div className="flex flex-col gap-10 flex-1 ">
            <CheckoutCart items={items} loading={isFirstLoading} />

            <CheckoutPersonalInfo
              className={isFirstLoading || items.length === 0 ? "opacity-65 pointer-events-none" : ""}
            />

            <CheckoutDeliveryInfo
              className={isFirstLoading || items.length === 0 ? "opacity-65 pointer-events-none" : ""}
            />
          </div>
          <CheckoutSidebar
            itemsPrice={totalAmount}
            loading={loading}
            isFirstLoading={isFirstLoading}
            className="w-[450px]"
          />
        </form>
      </FormProvider>
    </Container>
  );
}
