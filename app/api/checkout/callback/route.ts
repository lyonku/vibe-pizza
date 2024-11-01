import { PaymentCallbackData } from "@/@types/yookassa";
import { sendEmail } from "@/app/helpers";
import { SuccessPayment } from "@/common/components/email-templates";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    const isSucceeded = body.object.status === "succeeded";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    if (isSucceeded) {
      await sendEmail(
        order.email,
        "Vibe Pizza | Спасибо за заказ",
        SuccessPayment({ orderId: order.id, orderUrl: "" })
      );
    }
  } catch (error) {
    console.error("[Checkout Callback] Error", error);

    return NextResponse.json({ error: "Server error" });
  }
}
