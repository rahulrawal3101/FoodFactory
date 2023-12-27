import CONNECT_DATABASE from "@/app/config/connection";
import Addres from "@/app/models/addressModel";
import Cart from "@/app/models/cartModel";
import PlaceOrder from "@/app/models/placeOderModel";
import { NextResponse } from "next/server";




export async function POST(req) {
    await CONNECT_DATABASE();
    try {
        const body = await req.json();
        console.log('new item data', body);
        const { address, ...others } = body;
        // console.log('find uid in post api',others)
        const matchAddress = await Addres.find({ _id: address });
        // console.log('match address id', matchAddress[0])
        const toSave = await PlaceOrder({...others,addres:matchAddress[0]});
        // console.log('abcd ksnsk', toSave)
        const saved = await toSave.save();
        // console.log(saved);
        if(saved){
            return NextResponse.json({message:'Place Order Successfully',resp:saved},{status:201});
          
        }


    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }

}