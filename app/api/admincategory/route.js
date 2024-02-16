import CONNECT_DATABASE from "@/app/config/connection"
import Categorie from "@/app/models/categoryModel";
import { NextResponse } from "next/server";

export const GET=async(req,{params})=>{
await CONNECT_DATABASE();
try{
    const body = await Categorie.find()
    console.log('body data', body);
    if(body){
        return NextResponse.json({message:'Category Data Fetch Successfully',resp:body},{status:200});
    }else{
        return NextResponse.json({message:'Failed To Fetch Data'},{status:200});
    }
}catch(err){
    console.log(err);
    return NextResponse.json({message:'Internal Server Error'}, {status:500});
}
}