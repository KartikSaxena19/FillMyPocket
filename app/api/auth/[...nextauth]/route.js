import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";

import mongoose from "mongoose";
import User from '@/models/User';
import Payment from '@/models/Payment';
import connectDb from '@/db/connectDb';


export const authoptions =  NextAuth({
providers: [
  GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    authorization: {
      params: {
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`
      }
    }
  })
],
secret: process.env.NEXTAUTH_SECRET,
callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
     if(account.provider == "github") { 
      await connectDb()
      // Check if the user already exists in the database
      const currentUser =  await User.findOne({email: user.email}) 
      if(!currentUser){
        // Create a new user
         const newUser = await User.create({
          email: user.email, 
          username: user.email.split("@")[0], 
        })   
      } 
      return true
     }
     return false
  },
  
  async session({ session, user, token }) {
    await connectDb()
    const dbUser = await User.findOne({email: session.user.email})
    if(dbUser){

      session.user.name = dbUser.username
    }
    return session
  },
} 
})
export { authoptions as GET, authoptions as POST}
