import CONNECT_DATABASE from "@/app/config/connection"
import Item from "@/app/models/itemModel";
import { NextResponse } from "next/server";

export const PATCH=async(req,{params})=>{
    console.log('params item id',params)
    await CONNECT_DATABASE();
    try{
        const body = await req.json();
        // console.log('body data ', body);
        const {_id,image,review,createdAt,updatedAt,__v,...others}= body;
        // console.log('other data ',others);
        
        const res = await Item.findOneAndUpdate({_id:params.id},{...others},{new:true})
        // console.log('res Data',res);
        if(res){
            return NextResponse.json({message:'Item Updated Successully'},{status:200});
        }else{
            return NextResponse.json({message:'Failed To Update Item'},{status:200})
        }


    }catch(err){
        console.log(err);
        return NextResponse.json({message:'Internal Server Error'},{status:500});
    }

}