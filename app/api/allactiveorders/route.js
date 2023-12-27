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
        if(body.length > 0){

            return NextResponse.json({message:'Data Fetch Successfully',resp:body},{status:200})
        }
        if(body.length == 0){
            return NextResponse.json({message:'Failed To Fetch Data',resp:body},{status:200})
        }

    }catch(err){
        console.log(err);
        return NextResponse.json({message:'Internal Server Error'},{status:500})
    }

}