import CONNECT_DATABASE from "@/app/config/connection";
import PlaceOrder from "@/app/models/placeOderModel";
import { NextResponse } from "next/server";

export async function GET(req,){

    await CONNECT_DATABASE();
    try{
        const body = await PlaceOrder.find( 
                {$or:[{orderStatus:'Determined'},{orderStatus:'UnDetermined'},{orderStatus:'Pending'},{orderStatus:'Picked'},{orderStatus:'Accepted'},{orderStatus:'Cooking'},{orderStatus:'Preparing'},{orderStatus:'Delivered'},{orderStatus:'On The Way'},{orderStatus:'Placed'}]}
        );
        // console.log('all active orders data ',body)
        if(body){

            return NextResponse.json({message:'Data Fetch successfully',resp:body},{status:201})
        }

    }catch(err){
        console.log(err);
        return NextResponse.json({message:'Failed To Fetch Data'},{status:500})
    }

}