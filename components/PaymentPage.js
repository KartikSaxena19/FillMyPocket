"use client";
import React from "react";
import Script from "next/script";
import { initiate } from "@/actions/useraction";
import { useState,useEffect } from "react";
import { fetchuser, fetchpayment } from "@/actions/useraction";
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from "next/navigation";


const PaymentPage = ({ username }) => {

  const[paymentform,setPaymentform]=useState({name: "", message: "", amount: "" }) 
  const [currentUser, setcurrentUser] = useState({ })
  const [payments, setPayments] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    getData()
  }, []);

   useEffect(() => {
        if(searchParams.get("paymentdone") == "true"){
        toast('Thanks for your donation!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
          }
          router.push(`/${username}`)
     
    }, [])

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };


  const getData = async () => {
    let u=await fetchuser(username)
    setcurrentUser(u)
    let dbpayments=await fetchpayment(username)
    setPayments(dbpayments)
  }

    const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform)
    let orderid=a.id
    var options = {
      key: currentUser.razorpayid, // Replace with your Razorpay key_id
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "FillMyPocket",
      description: "Test Transaction",
      order_id: orderid, // This is the order_id created in the backend
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`, // Your success URL
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  };


  return (
    <>
    <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            {/* Same as */}
            <ToastContainer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover  w-full relative ">
        <img
          src={currentUser.coverpic} className=" object-cover w-full  h-30 md:h-[350px] "
          alt=""   
        />
        <div className="absolute -bottom-20 right-[33%] md:right-[45.5%] border-white overflow-hidden border-2 rounded-full size-36">
          <img
            className='rounded-full object-cover size-36' width={128} height={128}
          src={currentUser.profilepic}
            alt=""
          />
        </div>
      </div>

      {/* decodeuricomponent is used to remove %20 from the name or any other useless string */}
      <div className=" info flex justify-center items-center my-24 mb-32 flex-col gap-2">
        <div className="font-bold text-2xl">
          @{username}
        </div>
        <div className='text-slate-400 justify-center items-center text-center'>
                  {payments.length} Payments .   ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>

        <div className="payment flex my-3 mx-38 gap-3 w-full md:w-1/2 h-[50vh] flex-col md:flex-row">
          <div className="supporters  p-3 bg-slate-900 rounded-lg text-white  brutal-scrollbar hide-scrollbar w-full md:w-1/2 md:h-full">
            <h2 className="justify-center items-center text-center text-lg font-bold">
              Top 10 Supporters
            </h2>
            <ul>
              {payments.length === 0 && <li>No Payments Yet</li>}
              {payments.map((p,i)=>{
              return <li key={i} className="my-4 flex gap -2 items-center">
                <img src="avatar.gif" width={33} alt="user avatar" />
                <span>
                  {p.name} donated <span className="font-bold">₹{p.amount}</span> with a
                  message "{p.message}"
                </span>
              </li>
})}
              
            </ul>
          </div>
          <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white">
            <div className="flex flex-col gap-3 p-4 justify-center items-center">
              {/* input for name and message */}
              <input onChange={handleChange} value={paymentform.name} name="name"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter your name"
              />
              <input onChange={handleChange} value={paymentform.message} name="message"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter your message"
              />
              <input onChange={handleChange} value={paymentform.amount} name="amount"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter amount"
              />
              <button onClick={()=>pay(Number.parseInt(paymentform.amount)*100)}  className="p-3 w-full bg-blue-600 rounded-lg mt-2 cursor-pointer  disabled:bg-slate-600 disabled:from-purple-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length<2}>
                Donate
              </button>
            </div>
            {/* chose the amount and donate */}
            <div className="flex flex-col md:flex-row mx-4 gap-2 ">
              <button onClick={()=>pay(1000)} className="p-3 bg-slate-800 rounded-lg cursor-pointer ">
                Pay ₹10
              </button>
              <button onClick={()=>pay(2000)} className="p-3 bg-slate-800 rounded-lg cursor-pointer">
                Pay ₹20
              </button>
              <button onClick={()=>pay(5000)} className="p-3 bg-slate-800 rounded-lg cursor-pointer">
                Pay ₹50
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
