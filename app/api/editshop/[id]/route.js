import CONNECT_DATABASE from "@/app/config/connection";
import Shop from "@/app/models/shopModal";
import { NextResponse } from "next/server"

export const PATCH = async (req, { params }) => {
    // console.log('upadte single shop Data', params);
    await CONNECT_DATABASE();
    try {
        const body = await req.json();
        // console.log('body data', body);
        const res = await Shop.findOneAndUpdate({_id:params.id},{...body},{new:true});
        console.log('res id when click',res);
        if(res){
            return NextResponse.json({message:'Shop Update Successfully',resp:res},{status:200});
        }else{
            return NextResponse.json({message:'Failed To Update Shop'},{status:200});
        }

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};