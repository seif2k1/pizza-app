"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, useMantineTheme } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import "./modal.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handler } from "../../../lib/client";
import { useRouter } from "next/navigation";
export default function Demo({ price, setOpen, method }) {
  const [info, setInfo] = useState({
    name: "",
    number: "",
    address: "",
    method: method,
  });
  const [opened, { open, close }] = useDisclosure(setOpen);
  const product = useSelector((state) => state.products);
  const theme = useMantineTheme();
  const orderId = uuidv4();
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Payement Method"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        centered
        size={"lg"}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        {/* Modal content */}
        <form
          className="w-full h-full flex gap-5 mt-5 flex-col items-center justify-evenly"
          onSubmit={async (e) => {
            e.preventDefault();
            var infos = "";
            var res = "";
            if (method === 0) {
              for (const iterator of product?.cartItem) {
                const array = [iterator?.name];
                var quant = [iterator?.quantity];
                infos =
                  iterator?.size === 0
                    ? "L"
                    : iterator?.size === 1
                    ? "XL"
                    : "XXL";
                const string = array.join(",");
                res += quant + " of " + string + " size " + " " + infos + " , ";
              }
            } else {
              res = "https://dashboard.stripe.com/test/payments";
            }

            setInfo({
              ...info,
              method: method,
            });
            window.localStorage.setItem("order", orderId);

            await handler({
              id: orderId,
              descriptions: `Your Order is about :  ${res}  `,
              name: info.name,
              address: info.address,
              method: info.method,
              phone: info.number,
              total:
                info.method === 0
                  ? price
                  : window.localStorage.getItem("total"),
            });
            router.push(`/order/${orderId}`);
          }}
        >
          <div className="form__group">
            <input
              type="text"
              className="form__field w-100"
              placeholder="Input text"
              required
              value={info.name}
              onChange={(e) =>
                setInfo({
                  ...info,
                  name: e.target.value,
                })
              }
            />
            <label htmlFor="name" className="form__label">
              Name
            </label>
          </div>
          <div className="form__group">
            <input
              type="text"
              className="form__field w-100"
              placeholder="Input text"
              required
              value={info.number}
              onChange={(e) =>
                setInfo({
                  ...info,
                  number: e.target.value,
                })
              }
            />
            <label htmlFor="name" className="form__label">
              Phone Number
            </label>
          </div>
          <div className="form__group mt-5">
            <textarea
              value={info.address}
              onChange={(e) =>
                setInfo({
                  ...info,
                  address: e.target.value,
                })
              }
              type="text"
              className="form__field-1"
              placeholder="Input text"
              required
              cols="50"
              rows="10"
            ></textarea>
            <label htmlFor="name" className="form__label">
              Address
            </label>
          </div>
          <h1 className=" text-[20px] capitalize">
            {" "}
            you will pay <span className="text-green-600">150 Dz</span> on
            delivery
          </h1>
          <input
            type="submit"
            value="Place Order"
            className="bg-black text-white duration[1.1s] py-2 px-4 rounded-2xl "
          />
        </form>
      </Modal>

      <Group position="center">
        <button
          onClick={open}
          className="bg-black text-slate-100 mt-4 py-3 px-6 hover:bg-orange-950 cursor-pointer duration-200"
        >
          Pay on Delivery
        </button>
      </Group>
    </>
  );
}
