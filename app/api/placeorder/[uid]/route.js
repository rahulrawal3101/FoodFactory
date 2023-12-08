import CONNECT_DATABASE from "@/app/config/connection";
import PlaceOrder from "@/app/models/placeOderModel";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    console.log('find with uid active orders',params.uid)
    await CONNECT_DATABASE();
    try{
        const body = await PlaceOrder.find(
            {$and:[
                {uid:params.uid},
                {$or:[{orderStatus:'Determined'},{orderStatus:'Placed'},{orderStatus:'UnDetermined'},{orderStatus:'Pendiig'},{orderStatus:'Picked'},{orderStatus:'Accepted'},{orderStatus:'Cooking'},{orderStatus:'Preparing'},{orderStatus:'On The Way'}]}
            ]}
        );
        // console.log('placeorder data',body)
        if(body){

            return NextResponse.json({message:'Data Fetch successfully',resp:body},{status:201})
        }

    }catch(err){
        console.log(err);
        return NextResponse.json({message:'Failed To Fetch Data'},{status:500})
    }

}