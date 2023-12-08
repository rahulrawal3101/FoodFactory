import CONNECT_DATABASE from "@/app/config/connection"
import PlaceOrder from "@/app/models/placeOderModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
//   console.log('check iddddd',params)
    await CONNECT_DATABASE();
    try {
        const body = await PlaceOrder.findOne({_id:params.id});
        // console.log(body);
        if(body != null){
            return NextResponse.json({message:'Placed Order Successfully',resp:body},{status:200});
        }
        if(body == null){
            return NextResponse.json({message:'Failed To Place Order'},{status:200})
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
};