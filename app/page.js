import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <div className="text-white gap-4 flex flex-col items-center justify-center h-[44vh]">
        <div className="font-bold text-3xl flex items-center justify-center gap-2">
          Donate
          <span>
            <Image width={90} height={30} src="/dollar.gif" alt="" />
          </span>
        </div>
        <p>Your one simple donation can fill my pocket</p>
        <div>
          <Link href={'/login'}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
            >
            Start Here
          </button>
            </Link>


          <Link href={'/about'}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
          >
            Read Me
          </button>
            </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto my-6">
        <h2 className="font-mono text-lg">
          Oh yes, donate a whopping 100 rupees—because clearly, that’s the
          fortune standing between you and bankruptcy! Don’t worry, your
          financial empire won’t crumble over this ‘sacrifice.’ In fact, with
          100 rupees, you might even afford… half a meal at a roadside stall.
          Truly, a philanthropic milestone!
        </h2>
        <div className="flex gap-6 justify-around">
          <div className="my-10 m-3 justify-items-center text-center">
            <Image
              className="item bg-slate-400 rounded-full p-2 my-3"
              width={88}
              height={100}
              src="/man.gif"
              alt=""
            />
            <p>Individual donation accepted</p>
          </div>
          <div className="my-10 m-3 justify-items-center text-center">
            <Image
              className="item bg-slate-400 rounded-full p-2 my-3"
              width={88}
              height={100}
              src="/coin.gif"
              alt=""
            />
            <p>Donate minimum ₹10</p>
          </div>
          <div className="my-10 m-3 justify-items-center text-center">
            <Image
              className="item bg-slate-400 rounded-full p-2 my-3"
              width={88}
              height={100}
              src="/group.gif"
              alt=""
            />
            <p>Make community to donate</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto my-6 justify-center items-center text-center">
        <h1 className="font-mono text-lg">Connect With Me</h1>
        <div className="flex items-center justify-around my-6 ">
          <Link href={"https://www.instagram.com/kartik.19__/"}>
            <Image height={100} width={90} src="/ig.gif" alt="" />
        </Link>
          <Link href={"https://www.linkedin.com/in/kartik-saxena-2098b4270/"}>
            <Image height={100} width={90} src="/linkedin.gif" alt="" />
        </Link>
          <a href="mailto: saxenaaashu74@gmail.com">
            <Image height={100} width={90} src="/mail.gif" alt="" />
          </a>
        </div>
      </div>
    </>
  );
}
