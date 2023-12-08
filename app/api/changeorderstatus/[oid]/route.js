import CONNECT_DATABASE from "@/app/config/connection";
import PlaceOrder from "@/app/models/placeOderModel";
import { NextResponse } from "next/server";

export async function PATCH(req,{params}) {
    try {
        await CONNECT_DATABASE();
        const body = await req.json();
        // console.log('Params OID : ',params.oid);
        // console.log('OID Body', body.newStatus);
        const newData = await PlaceOrder.findOneAndUpdate({_id:params.oid},{orderStatus:body.newStatus},{new:true});
        // console.log('New Changed Data : ',newData);
        if(newData!=null){
            return NextResponse.json({message:'Order Status Changed',resp:newData},{status:200});
        }
        if(newData==null){
            return NextResponse.json({message:'Failed To Update'},{status:200});
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}