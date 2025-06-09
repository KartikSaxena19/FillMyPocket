import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDb();
    let body= await req.formData()
    body= Object.fromEntries(body)

    //check if razorpayOrderid is present on the server
    let p=await Payment.findOne({oid: body.razorpay_order_id})
    if(!p){
        return NextResponse.json({success: false, message: "Invalid Order ID"})
    }


    //Fetch the secret of the user who is recieving the payment
    let user= await User.findOne({username: p.to_user})
    const secret=user.razorpaysecret

    //verify the payment
    let xx= validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature, secret)

    if(xx){
        //update the payment object
        const updatedPayment = await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            {  done: "true" },
            { new: true }
        );
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)

    }
    else{
        return NextResponse.json({message: "Payment verification failed"}, {status: 400})
    }

}
