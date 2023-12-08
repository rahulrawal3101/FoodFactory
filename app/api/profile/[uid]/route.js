import CONNECT_DATABASE from "@/app/config/connection";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    console.log(' check user details',params)
    await CONNECT_DATABASE();
    try{
        const body = await User.find({_id:params.uid});
        console.log('login body',body);
        if(body){

            return NextResponse.json({message:'Fetch User Data Successfully',resp:body},{status:201});
        }else{
            return NextResponse.json({message:'Failed To Fetch Data'},{status:403});
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({message:'Internal Server Error'},{status:500});

    }
};