"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDeliveryDining } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { BsBoxSeam } from "react-icons/bs";
import cooking from "../../../../public/cooking.png";
import spinner from "../../../../public/spinner.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Clear } from "../../../../store/createReducer/ProductSlice";
import ReactConfetti from "react-confetti";

const page = ({ params }) => {
  const [Data, setData] = useState([]);
  const [btn, setBtn] = useState(false);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    if (Data?.status > 3) {
      window.localStorage.removeItem("order");
      window.localStorage.removeItem("total");
      setBtn(true);
      setInterval(() => {
        setBtn(false);
      }, 7000);
    }
  }, [Data]);
  useEffect(() => {
    dispatch(Clear(product));
  }, []);
  axios
    .get(
      `https://k9cx9iux.api.sanity.io/v1/data/query/production?query=*[id == "${params.id}"][0]`
    )
    .then((response) => {
      setData(response?.data?.result);
    })
    .catch((err) => console.log(err));

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);
  return (
    <>
      <div className="mt-[60px] w-screen h-full md:h-[calc(100vh-50px)] flex flex-col overflow-y-hidden items-center justify-evenly">
        <div className="flex w-[90%] h-[50%] md:h-[50%] md:w-[40%] gap-[15px] md:gap-0 flex-col items-center justify-between">
          {btn && (
            <ReactConfetti
              width={windowDimension.width}
              height={windowDimension.height}
              tweenDuration={5000}
            />
          )}
          <h1>Order in proccess</h1>
          <div className="flex items-center justify-between w-full">
            <h1 className="lg:w-[30%] w-[30%]">Order Id</h1>
            <p className="lg:w-[70%] w-[60%]">{Data?.id}</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <h1>Customers name</h1>
            <p>{Data?.name}</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <h1>Phone</h1>
            <p>{Data?.number}</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <h1>Method</h1>
            <p>{Data?.method === 0 ? "Cash Method" : "Paypal Method"}</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <h1>Total</h1>
            <p>{Data?.total} Dz</p>
          </div>
        </div>
        <div className="h-[30%] w-[80%] flex flex-wrap md:flex-nowrap gap-y-10 md:gap-y-0 items-center justify-between  mt-[20px]">
          <div className=" h-full w-full flex  flex-col items-center justify-between">
            <div className=" relative h-[50%] w-[100%]  flex items-center justify-center">
              <FaSackDollar fill="#FF5C5C" className=" " size={70} />
            </div>
            <h1 className="my-4 md:m-0">Payment</h1>
            {Data?.method === 0 ? (
              <button className="bg-red-500 cursor-default text-white rounded px-4 py-2">
                On Delivered
              </button>
            ) : (
              <button className="bg-green-500 cursor-default text-white rounded px-4 py-2">
                Success
              </button>
            )}
          </div>

          <div className=" h-full w-full flex flex-col items-center justify-between">
            <div className=" relative h-[50%] w-[100%]  flex items-center justify-center">
              <Image src={cooking} alt="cooking" height={80} width={80} />
              {Data?.status === 1 ? (
                <Image
                  src={spinner}
                  height={120}
                  width={120}
                  className=" absolute "
                  alt="spinner"
                />
              ) : (
                ""
              )}
            </div>
            <h1 className="my-4 md:m-0">Cooking</h1>
            <button
              className={`bg-green-500 cursor-default text-white rounded px-4 py-2 ${
                Data?.status > 1 ? "visible" : "invisible"
              }`}
            >
              Success
            </button>
          </div>

          <div className=" h-full w-full flex flex-col items-center justify-between">
            <div className=" relative h-[50%] w-[100%]  flex items-center justify-center">
              <MdDeliveryDining fill="#FF5C5C" className=" " size={70} />

              {Data?.status === 2 ? (
                <Image
                  alt="spinner"
                  src={spinner}
                  height={120}
                  width={120}
                  className=" absolute "
                />
              ) : (
                ""
              )}
            </div>
            <h1 className="my-4 md:m-0">On way</h1>
            <button
              className={`bg-green-500 cursor-default text-white rounded px-4 py-2 ${
                Data?.status > 2 ? "visible" : "invisible"
              }`}
            >
              Success
            </button>
          </div>

          <div className=" h-full w-full flex flex-col items-center justify-between">
            <div className=" relative h-[50%] w-[100%]  flex items-center justify-center">
              <BsBoxSeam fill="#FF5C5C" className=" " size={70} />

              {Data?.status === 3 ? (
                <Image
                  alt="spinner"
                  src={spinner}
                  height={120}
                  width={120}
                  className=" absolute "
                />
              ) : (
                ""
              )}
            </div>
            <h1 className="my-4 md:m-0">Delivered</h1>{" "}
            <button
              className={`bg-green-500 cursor-default text-white rounded px-4 py-2 ${
                Data?.status > 3 ? "visible" : "invisible"
              }`}
            >
              Delivered
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
