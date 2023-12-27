import CONNECT_DATABASE from "@/app/config/connection"
import Item from "@/app/models/itemModel";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
    console.log('param item id', params)
    await CONNECT_DATABASE();
    try {
        const body = await req.json();
        console.log('body item id',body);
        const res = await Item.findOneAndUpdate({_id:params.id},{isAvailable:body.isAvailable},{new:true});
        if(res){
            return NextResponse.json({message:'Item Update Successfully'},{status:200});
        }else{
            return NextResponse.json({message:'Failed To Update Item'},{status:200});
        }


    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}