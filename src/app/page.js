"use client";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { client, urlFor } from "../../lib/client";
import { useEffect, useState } from "react";
const getServerSide = async () => {
  const query = `*[_type == "pizza"]`;
  const pizzas = await client.fetch(query);
  return pizzas;
};
export default function Home() {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    getServerSide()
      .then((res) => setData(res))
      .catch((error) => console.log(error));
    /*  axios
      .get(
        `https://k9cx9iux.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%22pizza%22%5D`
      )
      .then((response) => setData(response))
      .catch((err) => console.log(err)); */
  }, []);
  useEffect(() => {
    setFilterData(data);
  }, [data]);
  const handleChange = (e) => {
    const filter = data?.filter((response) =>
      response?.name.toLowerCase().includes(e.target.value)
    );
    setFilterData(filter);
  };
  return (
    <main className="min-h-screen py-24">
      <div className="flex items-center w-full justify-center md:justify-between flex-wrap gap-5">
        <div className="w-full flex items-center justify-center">
          <input
            onChange={handleChange}
            style={{
              border: "2px solid lightgray",
              borderRadius: "35px",
              padding: "8px 12px",
              textIndent: "12px",
            }}
            className="w-[80%] md:w-[50%]"
            type="text"
            placeholder="Search here ...."
          />
        </div>
        {filterData?.map((res, i) => {
          const source = urlFor(res.image?.asset?._ref);
          return (
            <div
              key={i}
              className="flex items-center justify-center flex-col  "
            >
              <div className=" h-[21rem] w-[20rem] md:h-[22rem] md:w-[22rem]  relative overflow-hidden ">
                <Link href={`./pizza/${res?.slug?.current}`}>
                  <Image
                    loader={() => source}
                    src={source}
                    className=" absolute inset-0 scale-[0.8] hover:scale-[1] duration-[1.2s] "
                    objectFit="cover"
                    layout="fill"
                    alt={res.name}
                  />
                </Link>
              </div>
              <h1 className="flex items-center justify-center my-3">
                {res.name}
              </h1>
            </div>
          );
        })}
      </div>
    </main>
  );
}
