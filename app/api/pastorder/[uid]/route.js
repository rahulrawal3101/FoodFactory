import CONNECT_DATABASE from "@/app/config/connection";
import PlaceOrder from "@/app/models/placeOderModel";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    // console.log('find with uid active orders',params.uid)
    await CONNECT_DATABASE();
    try{
        const body = await PlaceOrder.find(
            {$and:[
                {uid:params.uid},
                {$or:[{orderStatus:'Cancel By Admin'},{orderStatus:'Cancel By Customer'},{orderStatus:'Cancel By Merchant'},{orderStatus:'Cancel'},{orderStatus:'Rejected By Admin'},{orderStatus:'Rejected By Merchant'}]}
            ]}
        );
        console.log('placeorder data',body)
        if(body.length != 0){

            return NextResponse.json({message:'Data Fetch Successfully',resp:body},{status:200});
        }
        if(body.length == 0){
            return NextResponse.json({message:'Failed To Fetch Data'},{status:200})
        }


    }catch(err){
        console.log(err);
        return NextResponse.json({message:'Internal Server Error'},{status:500})
    }

}