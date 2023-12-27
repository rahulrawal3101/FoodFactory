import CONNECT_DATABASE from "@/app/config/connection";
import PlaceOrder from "@/app/models/placeOderModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    // console.log('all user details', params);
    await CONNECT_DATABASE();
    try {
        const body =await PlaceOrder.findOne({_id:params.id});
        // console.log(body);
        if(body){
            return NextResponse.json({message:'User Details Fetch SuccessFully',resp:body},{status:200});
        }else{
            return NextResponse.json({message:'Failed To Fetch User Details'},{status:200})
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' },{status:500});
    }
};