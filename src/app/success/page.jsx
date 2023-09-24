"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Page from "../cart/page";
import Demo from "../../components/modal/Modal";

const SuccessPage = () => {
  /* const router = useRouter();
  router.push("/cart"); */
  return (
    <div>
      {window.localStorage.getItem("order") ? (
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-10">
          <h1>
            You cant add any order because you have an order in proccessing ....
          </h1>
          <Link
            href={`/order/${window.localStorage.getItem("order")}`}
            className="bg-black text-white duration[1.1s] py-2 px-4 rounded-2xl"
          >
            See Your Order
          </Link>
        </div>
      ) : (
        ""
      )}
      <Demo method={1} setOpen={true} />
    </div>
  );
};

export default SuccessPage;
