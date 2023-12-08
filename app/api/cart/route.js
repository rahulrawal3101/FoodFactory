import CONNECT_DATABASE from "@/app/config/connection";
import Cart from "@/app/models/cartModel";
import { NextResponse } from "next/server";

export async function POST(req){
    await CONNECT_DATABASE();
try{
    const body = await req.json();
    // console.log(" check uid ",body);
    const {_id, ...other} = body;
    // console.log("other",other);
    const  toSave= await Cart(other);
    // console.log('check uid ',toSave)
    const  saved= await toSave.save();
    // console.log('new item added',saved);
    if(saved){
        return NextResponse.json({message:'Add To Cart Successfully'},{status:201})
    }else{
        return NextResponse.json({message:'Failed to Add Item'},{status:403})
    }


}catch(err){
    console.log(err);
    return NextResponse.json({message:'Internal Server Error'},{status:500})

}
};