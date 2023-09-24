"us client";
import Link from "next/link";
import { SlWallet } from "react-icons/sl";
import { TbPaperBag } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation"; /* 
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"; */

const Nav = () => {
  const router = useRouter();
  const product = useSelector((state) => state.products);

  return (
    <nav className="flex items-center justify-between fixed top-0 start-0 end-0 h-[55px] px-8 z-[1] bg-white shadow-md">
      <Link href="../">Home</Link>

      {/* <div>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button>Sign in</button>
          </SignInButton>
        </SignedOut>
      </div> */}
      <div className="flex items-center justify-between">
        <div className=" p-1 relative ">
          <span className="bg-black rounded-full text-sm flex items-center justify-center h-[20px] text-white w-[20px] absolute top-0 end-0 border-2">
            {product.cartItem.length}
          </span>
          <Link href="/cart">
            <SlWallet size={35} />
          </Link>
        </div>

        {window.localStorage.getItem("order") ? (
          <Link href={`/order/${localStorage.getItem("order")}`}>
            <TbPaperBag size={35} />
          </Link>
        ) : (
          <Link href={"/order"}>
            <TbPaperBag size={35} />
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Nav;
/**(
          <p className=" hidden"></p>
        ) */
