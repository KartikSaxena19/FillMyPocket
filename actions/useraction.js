"use server"
import Razorpay from 'razorpay'
import Payment from '@/models/Payment'
import connectDb from '@/db/connectDb'
import User from '@/models/User'

export const initiate = async(amount , to_username, paymentform)=>{
    await connectDb()
    //Fetch the secret of the user who is recieving the payment
        let user= await User.findOne({username: to_username})
        const secret=user.razorpaysecret
    var instance= new Razorpay({
        key_id: user.razorpayid,
        key_secret: secret,
      });
      
      let options={
        amount: Number.parseInt(amount),
        currency: "INR",
      }
      let x= await instance.orders.create(options)
      //create a payment object which show pending payment in the database
      await Payment.create({
        name: paymentform.name,
        to_user: to_username,
        oid: x.id,
        message: paymentform.message,
        amount: amount/100,
      })
      return x
}


export const fetchuser = async(username)=>{
    await connectDb()
    let u=await User.findOne({username: username})
    let user=u.toObject({flattenObjectIds: true})
    return user
}

export const fetchpayment = async(username)=>{
    await connectDb()
    //find payments in decreasing amount
    let p=await Payment.find({to_user: username, done: true}).sort({amount: -1}).limit(10).lean()
    return p
  
  }

export const updateProfile = async (data, oldusername) => {
  await connectDb();
  let ndata= Object.fromEntries(data);

  //If the username is being updated check if username is available
  if (ndata.username !== oldusername) {
    let u= await User.findOne({ username: ndata.username });
    //if user with that username exists return error
    if (u) {
      return { success: false, message: "Username already taken" };
    }

    //This is for updating username without creating the new user
    await User.updateOne({email : ndata.email}, ndata)
    await Payment.updateMany({to_user: oldusername},{to_user: ndata.username})
  }
  else{

    await User.updateOne({email: ndata.email}, ndata) //email should not be changed
  }
}