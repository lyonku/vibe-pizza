import { AccordionContent, AccordionItem, AccordionTrigger, Title } from "@/common/ui";
import { FC, Fragment } from "react";
import { OrderInfoItem, OrderInfoStatus } from "./components";
import { ChevronDown } from "lucide-react";
import { Additive, CartItem, Ingredient, OrderStatus, Product, ProductVariant } from "@prisma/client";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { getCartItemDetails } from "@/common/lib";
import { PizzaType } from "@/common/constants/pizza";
import { cn } from "@/common/lib/utils";

type CartItemWithDetails = CartItem & {
  additives: Additive[];
  removedIngredinets: Ingredient[];
  productVariant: ProductVariant & { product: Product };
};

interface OrderInfoProps {
  id: number;
  totalAmount: number;
  items: CartItemWithDetails[];
  date: Date;
  status: OrderStatus;
  withoutState?: boolean;
}

export const OrderInfo: FC<OrderInfoProps> = ({ id, totalAmount, items, date, status, withoutState }) => {
  const formatDate = (date: Date) => format(date, "d MMMM yyyy, 'в' HH:mm", { locale: ru });

  return (
    <AccordionItem value={`item-${id}`} className="bg-white rounded-[30px] border-b-0">
      <AccordionTrigger
        className={cn(
          "hover:no-underline p-0 AccordionTrigger px-[35px] py-[25px]",
          withoutState && "cursor-default"
        )}
      >
        <div className="flex items-center gap-5">
          <Title text={`Заказ №${id}`} className="text-2xl font-bold" />
          <time dateTime={String(new Date(date))} className="text-[#AEAEAE] text-base">
            {formatDate(date)}
          </time>
        </div>
        <div className="flex items-center gap-5">
          <OrderInfoStatus status={status} />
          {!withoutState && <ChevronDown className="AccordionChevron text-[#aeaeae]" aria-hidden />}
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col px-[35px] pb-[25px]">
        <hr className="-mx-[35px] border-0 border-b border-[#F3F3F3] my-5 mt-0" />

        <div className="">
          {items.map((item) => {
            const product = item.productVariant.product;
            const productVariant = item.productVariant;
            return (
              <Fragment key={item.id}>
                <OrderInfoItem
                  quantity={item.quantity}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  productId={product.id}
                  price={productVariant.price}
                  details={getCartItemDetails(
                    productVariant.size,
                    productVariant.sizeType,
                    productVariant.pizzaType as PizzaType,
                    productVariant.weight,
                    item.additives,
                    item.removedIngredinets
                  )}
                  disabled={false}
                />
                <hr className="-mx-[35px] border-0 border-b border-[#F3F3F3] my-5" />
              </Fragment>
            );
          })}
        </div>
        <div className="text-xl">
          Итого: <strong className="font-extrabold">{totalAmount} ₽</strong>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
