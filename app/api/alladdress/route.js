import CONNECT_DATABASE from "@/app/config/connection";
import Addres from "@/app/models/addressModel";
import { NextResponse } from "next/server";

export async function GET(req){
await CONNECT_DATABASE();
try{
    const body = await Addres.find()
    // console.log(body)
    if(body.length != 0 ){
        return NextResponse.json({message:'All Address Data Fetch Successfully',resp:body},{status:200})
    }
    if(body.length == 0){
        return NextResponse.json({message:'Failed To Fetch All Address Data'},{status:200})
    }

}catch(err){
console.log(err)
return NextResponse.json({message:'Internal Server Error'},{status:500})
}
}