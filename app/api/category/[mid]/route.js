import CONNECT_DATABASE from "@/app/config/connection";
import Categorie from "@/app/models/categoryModel";
import { NextResponse } from "next/server";
// const { NextResponse } = require("next/server");

export async function GET(req,{params}){
    // console.log('cat param',params)
    try{
        await CONNECT_DATABASE();
        const allCat = await Categorie.find({mid:params.mid});
        if(allCat.length >  0){
            return NextResponse.json({message:'All Data Fetch',resp:allCat},{status:200})
        }
        if(allCat.length == 0){
            return NextResponse.json({message:'Failed To Fetch Data'},{status:200})
        }


    }catch(err){
        console.log(err)
        return NextResponse.json({message:'internal Server Error'},{status:500})
    }
}

export async function POST(req){
    try{
        await CONNECT_DATABASE();
        const catDetails = await req.json();
      
        const schemas = Categorie({...catDetails});
        const catData = await schemas.save();
        if(catData){
            return NextResponse.json({message:'Cat Add Successfully',resp:catData},{status:201})
        }else{
            return NextResponse.json({message:'Failed To Add Category'},{status:403})
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({message:'Internal Server Error'}, {status:500})

    }

}