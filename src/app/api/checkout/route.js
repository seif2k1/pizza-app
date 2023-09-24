import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

export const POST = async (request) => {
  // @ts-ignore
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const reqBody = await request.json();
    const { items } = await reqBody;

    const extractingItems = await items.map((item) => {
      const img = item.image.asset._ref;
      const newImage = img
        .replace("image-", "https://cdn.sanity.io/images/k9cx9iux/production/")
        .replace("-png", ".png");

      return {
        quantity: item.quantity,
        price_data: {
          currency: "dzd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            images: [newImage],
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: extractingItems,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
    });

    return NextResponse.json({
      message: "Connection is Active!",
      success: true,
      id: session.id,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
