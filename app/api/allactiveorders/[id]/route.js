import CONNECT_DATABASE from "@/app/config/connection"
import PlaceOrder from "@/app/models/placeOderModel";
import { NextResponse } from "next/server";

export const DELETE=async(req,{params})=>{
    // console.log('req data', req);
    console.log('params id', params);
await CONNECT_DATABASE();
try{
const body = await PlaceOrder.deleteOne({_id:params.id});
// console.log('delete active order', body)
if(body){
    return NextResponse.json({message:'Delete Active Order Successfully'},{status:200});
}else{
    return NextResponse.json({message:'Failed To Delete Active Order'},{status:200})
}

}catch(err){
console.log(err);
return NextResponse.json({message:'Internal Server Error'},{status:500});
}
}