import CONNECT_DATABASE from "@/app/config/connection"
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";

export const PATCH=async(req,{params})=>{
    // console.log('check params ',params)
    await CONNECT_DATABASE();
    try{
        const body = await req.json();
        // console.log('user details admin',body);
        const res = await User.findOneAndUpdate({_id:params.id},{fullName:body.fullName,email:body.email,mobile:body.mobile,isActive:body.isActive},{new:true});
        console.log(res);
        if(res != null){
            return NextResponse.json({message:'UserDetails Edited Successfully',resp:res},{status:200});
        }
        if(res == null){
            return NextResponse.json({message:'Failed To Edit Userdetails'},{status:200});
        }
        

    }catch(err){
        console.log(err);
        return NextResponse.json({message:'Internal Server Error'},{status:500});
    }

}