import CONNECT_DATABASE from "@/app/config/connection";
import Cart from "@/app/models/cartModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    // console.log('cart param id',params)
    await CONNECT_DATABASE();
    try {
        const body = await Cart.find({ uid: params.id });
        // console.log('body data', body);
        if(body.length != 0){

            return NextResponse.json({ message: 'Data Fetch Successfully', resp: body }, { status: 200 });
        }
        if(body.length == 0){
            return NextResponse.json({ message: 'Failed To Fetch Data', resp: body   }, { status: 200 });
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error'},{status:500});


    }
};

export async function DELETE(req,{params}) {
    // console.log('delete id',params);
    await CONNECT_DATABASE();
    try { 
        const body = await Cart.deleteOne({_id:params.id});
        const body1 = await Cart.deleteMany({uid:params.uid});
        // console.log('body data',body);
        if(body){

            return NextResponse.json({message:'Item Deleted Successfully'},{status:200});
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({message:'Internal Server Error'},{status:500});
     }
};
