import CONNECT_DATABASE from "@/app/config/connection"
import Item from "@/app/models/itemModel";
import { NextResponse } from "next/server";

export const GET=async()=>{
    await CONNECT_DATABASE();
    try{
        const body = await Item.find();
        // console.log('body data',body );
        if(body){
            return NextResponse.json({message:'Items Data Fetch Successfully',resp:body},{status:200});
        }else{
            return NextResponse.json({message:'Failed To Fetch Items Data'},{status:200})
        }
        

    }catch(err){
        console.log(err);
        return NextResponse.json({message:'Internal Server Error'},{status:500});
    }
}