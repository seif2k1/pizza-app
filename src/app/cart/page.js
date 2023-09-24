"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { urlFor } from "../../../lib/client";
import logo from "../../../public/undraw_personal_data_re_ihde.svg";
import { loadStripe } from "@stripe/stripe-js";
import Demo from "@/components/modal/Modal";
import { Delete } from "../../../store/createReducer/ProductSlice";

const Page = () => {
  const product = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const newTotal = () => {
    const total = product?.cartItem.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    return total;
  };

  // =============  Stripe Payment Start here ==============
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  localStorage.setItem("total", newTotal());
  const handleCheckout = async (e) => {
    e.preventDefault();
    putTotal;
    const stripe = await stripePromise;
    const response = await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: product?.cartItem,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      stripe?.redirectToCheckout({ sessionId: data.id });
    } else {
      throw new Error("Failed to create Stripe Payment");
    }
  };
  // =============  Stripe Payment End here ================

  return (
    <>
      {localStorage.getItem("order") ? (
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-10">
          <h1>
            You cant add any order because you have an order in proccessing ....
          </h1>
          <Link
            href={`/order/${localStorage.getItem("order")}`}
            className="bg-black text-white duration[1.1s] py-2 px-4 rounded-2xl"
          >
            See Your Order
          </Link>
        </div>
      ) : (
        <div>
          {product?.cartItem?.length > 0 ? (
            <div className="mt-[60px] h-[90vh] overflow-hidden  w-full md:flex-row flex flex-col items-center justify-between">
              <div className="h-full w-[100%] md:w-[50%] lg:w-full overflow-y-scroll ">
                <table className="w-full relative sm:overflow-x-auto text-sm text-left ">
                  <thead className="text-xs  uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        Pizza
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product?.cartItem?.map((item, i) => {
                      const source = urlFor(item.image);
                      return (
                        <tr key={i} className="h-[100px]">
                          <th
                            scope="row"
                            className="px-6 py-4 relative flex items-center justify-center text-center "
                          >
                            <Image
                              loader={() => source}
                              src={source}
                              className="  "
                              objectFit="cover"
                              height={85}
                              width={85}
                              alt={item.name}
                            />
                          </th>
                          <td className="px-6 py-4 text-center">
                            {item?.name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {item?.size === 0
                              ? "L"
                              : item?.size === 1
                              ? "Xl"
                              : "XXL"}
                          </td>
                          <td className="px-6 py-4 text-center">
                            $ {item?.price}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {item?.quantity}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              className="bg-black text-white duration[1.1s] py-2 px-4 rounded"
                              onClick={() => {
                                dispatch(Delete(i));
                                toast.error(
                                  `${item?.name} romeved from your cart`
                                );
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="h-full w-[100%] lg:w-[70%] md:w-[50%] flex items-center justify-center">
                <div className="h-[90%] w-[90%] md:h-[80%] md:w-[90%] lg:h-[60%] lg:w-[80%] p-11  border-[1px] border-solid border-gray-100 rounded-2xl shadow-2xl">
                  <div className="h-full w-full flex flex-col items-center justify-between ">
                    <h1 className="text-center w-full text-[40px]">Cart</h1>
                    <div className="w-full">
                      <div className="w-full flex items-center justify-between">
                        <h3
                          className="text-[28px] capitalize"
                          style={{ letterSpacing: "6px", fontStyle: "italic" }}
                        >
                          Items
                        </h3>
                        <p className="text-[20px]">
                          {product?.cartItem.length}
                        </p>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <h3
                          className="text-[28px] capitalize"
                          style={{ letterSpacing: "6px", fontStyle: "italic" }}
                        >
                          total
                        </h3>
                        <p className="text-[20px]">dzd {newTotal()} </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <button
                          onClick={handleCheckout}
                          className="bg-black text-slate-100 mt-4 py-3 px-6 hover:bg-orange-950 cursor-pointer duration-200"
                        >
                          Proceed to checkout
                        </button>

                        <Demo price={newTotal()} setOpen={false} method={0} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-screen w-screen flex flex-col items-center gap-y-9 justify-center">
              <Image
                src={logo?.src}
                alt={logo?.src}
                height={100}
                width={100}
                property
                className="md:h-1/2 md:w-1/2 w-full h-full "
              />
              <h1
                className=" text-[20px] capitalize text-gray-800 text-center"
                style={{ fontStyle: "italic", letterSpacing: "10px" }}
              >
                Empty Page Please Add pizza to your cart
              </h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
