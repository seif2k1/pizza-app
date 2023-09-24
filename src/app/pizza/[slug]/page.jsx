"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import States from "../../../components/state/States";

import { addItem } from "../../../../store/createReducer/ProductSlice";
export default function Pizza({ params }) {
  const [number, setNumber] = useState(0);
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { slug = "" } = params;
  const totalPrice = () => {
    return data?.data?.result?.price[number] * quantity;
  };

  const info = {
    ...data?.data?.result,
    size: number,
    quantity: quantity,
    price: totalPrice(),
  };
  useEffect(() => {
    axios
      .get(
        `https://k9cx9iux.api.sanity.io/v1/data/query/production?query=*[slug.current == '${slug}'][0]`
      )
      .then((response) => {
        setData(response);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mt-[50px] text-center h-full w-full md:h-full md:w-full lg:h-screen lg:mt-0 lg:w-screen lg:flex-row flex flex-col items-center justify-between">
      <div className="flex items-center justify-center  w-full h-full  ">
        <States data={data?.data?.result?.image} number={number} />
      </div>
      <div className="flex flex-col items-center lg:items-start justify-around w-full h-full p-8 gap-y-10 ">
        <h1 className=" text-[40px]">{data?.data?.result?.name}</h1>

        <p className="w-[80%] word-wrap text-center lg:text-left ">
          {data?.data?.result?.details}
        </p>
        <h1 className="text-[40px] duration-[1.2s]">
          {data?.data?.result?.price[number]}
          <span className="ms-3">Dz</span>
        </h1>
        {data ? (
          <div className=" w-1/2 flex items-center justify-between">
            <button
              onClick={() => setNumber(0)}
              className={`
              duration-[1.2s]
              ${
                number === 0
                  ? "bg-black text-white w-[39px] rounded"
                  : "w-[39px]"
              }`}
            >
              L
            </button>
            <button
              onClick={() => setNumber(1)}
              className={`
              duration-[1.2s]
              ${
                number === 1
                  ? "bg-black text-white w-[39px] rounded"
                  : "w-[39px] "
              }`}
            >
              XL
            </button>
            <button
              onClick={() => setNumber(2)}
              className={`
              duration-[1.2s]
              ${
                number === 2
                  ? "bg-black text-white w-[39px] rounded"
                  : "w-[39px]"
              }`}
            >
              XXL
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="w-[60%] sm:w-[30%] flex items-center justify-between">
          <button
            className="bg-black text-white w-[39px] rounded"
            onClick={() => {
              quantity >= 1 ? setQuantity(quantity + 1) : 0;
            }}
          >
            +
          </button>
          <button>{quantity}</button>

          <button
            className="bg-black text-white w-[39px] rounded"
            onClick={() => {
              quantity > 1 ? setQuantity(quantity - 1) : 0;
            }}
          >
            -
          </button>
        </div>
        <button
          onClick={() => dispatch(addItem(info))}
          className="bg-black text-white duration[1.1s] py-2 px-4 rounded"
        >
          Add Item
        </button>
      </div>
    </div>
  );
}
