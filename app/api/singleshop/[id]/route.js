import CONNECT_DATABASE from "@/app/config/connection";
import Shop from "@/app/models/shopModal";
import { NextResponse } from "next/server";


export const GET=async(req,{params})=>{
    // console.log('params shop id', params)
await CONNECT_DATABASE();
try{
const body = await Shop.findOne({_id:params.id})
// console.log('sigle shop id ',body);
if(body){
    return NextResponse.json({message:'Shop Data Fetch Successfully',resp:body},{status:200});
}else{
    return NextResponse.json({message:'Failed To Fetch Shop Data'},{status:200});
}

}catch(err){
    console.log(err);
    return NextResponse.json({message:'Internal Server error'},{status:500})
}
}
