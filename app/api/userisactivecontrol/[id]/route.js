import CONNECT_DATABASE from "@/app/config/connection"
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
    console.log('check user id edit', params);
    await CONNECT_DATABASE();
    try {
        const body = await req.json();
        // console.log('check isactive user',body);
        const resp = await User.findOne({_id:params.id});
        // console.log('upadte user ',resp);
        if(resp != null){
            const updateUser = await User.findOneAndUpdate({_id:params.id},{isActive:body.isActive});
            return NextResponse.json({message:'User Updated Successfully'},{status:200})
        }
        if(resp == null){
            return NextResponse.json({message:'User Not Updated'},{status:200})
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}