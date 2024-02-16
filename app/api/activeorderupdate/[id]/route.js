import CONNECT_DATABASE from "@/app/config/connection"
import PlaceOrder from "@/app/models/placeOderModel";
import { NextResponse } from "next/server";

export const PATCH=async( req,{params})=>{
    // console.log('req data',params)
await CONNECT_DATABASE();
try{
    const body = await req.json();
    // console.log('body', body);
   const {_id,items,payment,addres,...others} = body;
//    console.log('others',others);
   const res = await PlaceOrder.findOneAndUpdate({_id:params.id},{...others},{new:true})
//    console.log('res', res);
   if(res){
    return NextResponse.json({message:'Active Order Update Successfully'},{status:200});
   }else{
    return NextResponse.json({message:'Failed To Update Active Orders'},{status:200});
   }
}catch(err){
console.log(err);
return NextResponse.json({message:'Internal Server Error'},{status:500})
}
}