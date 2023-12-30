import CONNECT_DATABASE from "@/app/config/connection"
import Categorie from "@/app/models/categoryModel";
import { NextResponse } from "next/server";

export const PATCH=async(req,{params})=>{
    console.log('checking cat id with params fuc',params)
    
await CONNECT_DATABASE();
try{
    const body = await req.json();
    // console.log('checking req data',body);
    const res = await Categorie.findOneAndUpdate({_id:params.id},{name:body.name,isAvailable:body.isAvailable},{new:true});
    // console.log('new update',res)
    if(res){
        return NextResponse.json({message:'Category Updated Successfully'},{status:200})
    }else{
        return NextResponse.json({message:'Failed To Update Category'},{status:200})
    }
    

}catch(err){
return NextResponse.json({message:'Internal Server Error'},{status:500});
}
}