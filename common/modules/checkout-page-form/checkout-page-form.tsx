"use client";

import { FC } from "react";
import { CheckoutCart } from "@/common/modules/checkout-cart";
import { CheckoutSidebar } from "@/common/modules/checkout-sidebar";
import { CheckoutPersonalInfo } from "@/common/modules/checkout-personal-info";
import { CheckoutDeliveryInfo } from "@/common/modules/checkout-delivery-info";
import { useCart } from "@/common/hooks/use-cart";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormType } from "@/common/schemas";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useState } from "react";
import { User } from "@prisma/client";

interface CheckoutPageFormProps {
  userData?: User | null;
}

export const CheckoutPageForm: FC<CheckoutPageFormProps> = ({ userData }) => {
  const { items, totalAmount, loading } = useCart(true);
  const isFirstLoading = loading && items.length === 0;
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: userData?.email || "",
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      phone: userData?.phone || "",
      address: userData?.address || "",
      comment: "",
      deliveryTime: "Побыстрее",
    },
  });

  const onSubmit = async (data: CheckoutFormType) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.error("Заказ успешно оформлен 📝", {
        icon: "✅",
      });

      if (url) {
        location.href = url;
      }
    } catch (error) {
      toast.error("Не удалось создать заказ", {
        icon: "❌",
      });
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-10 mb-20 max-lg:gap-5 max-md:flex-col">
        <div className="flex flex-col gap-10 flex-1 max-lg:gap-5">
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
          loading={loading || submitting}
          isFirstLoading={isFirstLoading}
          className="w-[450px] max-xl:w-auto"
        />
      </form>
    </FormProvider>
  );
};
