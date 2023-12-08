import CONNECT_DATABASE from "@/app/config/connection";
import Cart from "@/app/models/cartModel";
import { NextResponse } from "next/server";

export async function DELETE(req,{params}) {
    // console.log('deleteallcartitems id',params);
    await CONNECT_DATABASE();
    try { 
       
        const body1 = await Cart.deleteMany({uid:params.uid})
        // console.log('body data',body1);
        if(body1){

            return NextResponse.json({message:'Item Deleted Successfully'},{status:201})
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({message:'Internal Server Error'},{status:500})
     }
};