import CONNECT_DATABASE from "@/app/config/connection";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";

export const PATCH=async(req,{params})=>{
    console.log('check edit password ',params)
    await CONNECT_DATABASE();
    try{
        const body =await req.json();
       const resp = await User.findOne({_id:params.uid});
    //    console.log('check edit password',body);
       console.log('check edit password',resp.password);

       if(resp != null){
        if(body.currentPassword == resp.password){
           const newPass = await User.findOneAndUpdate({_id:params.uid},{password:body.currentPassword})
           return NextResponse.json({message:'Password Changed Successfully'},{status:200})
        }else{
            return NextResponse.json({message:'Fill The Correct Password'},{status:200})

        }
    
       }
       if(resp == null){
        return NextResponse.json({message:'Failed To Change Password'},{status:200})

       }
        
    }catch(err){
        console.log(err);
        return NextResponse.json({message:'Internal Server Error'},{status:500});
    }
}