import CONNECT_DATABASE from "@/app/config/connection";
import Categorie from "@/app/models/categoryModel";
import Item from "@/app/models/itemModel";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    
    try {
        await CONNECT_DATABASE();
        const getCategory = await Categorie.find({mid:params.mid});
        const getItems = await Item.find({mid:params.mid});    
        if(getCategory.length != 0 && getItems .length != 0){

            return NextResponse.json({ message: 'Data Fetch Successfully', respCat: getCategory, respItem: getItems },{status:200});
        }
        if(getCategory.length == 0 && getItems.length == 0){
            return NextResponse.json({ message: 'Failed To Fetch Data', respCat: getCategory, respItem: getItems },{status:200});
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({message:'Internal Server Error'},{status:500});
    }
};