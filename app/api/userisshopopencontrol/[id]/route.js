import CONNECT_DATABASE from "@/app/config/connection";
import Shop from "@/app/models/shopModal";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
    // console.log('isshopopen param id :', params,)
    await CONNECT_DATABASE();
    try {
        const body = await req.json();
        // console.log('shop open body :', body);
        const res = await Shop.findOneAndUpdate({_id:params.id},{isShopOpen:body.isShopOpen},{new:true});
        // console.log('is shop open id open ',res);
        if(res != null){
            // const updateShop = await Shop.findOneAndUpdate({_id:params.id},{isShopOpen:body.isShopOpen});
            return NextResponse.json({message:'Shop Update Successfully',resp:res},{status:200});
        }
        if(res == null){
            return NextResponse.json({message:'Failed To Update Shop'},{status:200});
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}