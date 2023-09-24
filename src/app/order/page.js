import Link from "next/link";

const Page = () => {
  return (
    <div>
      <div className="h-screen w-screen flex flex-col gap-10 items-center justify-center">
        <h1>Empty Page Please click here to back home then add Your order</h1>
        <Link
          href={"/"}
          className="bg-black text-white duration[1.1s] py-2 px-4 rounded-2xl"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Page;
