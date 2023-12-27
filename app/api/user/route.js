import CONNECT_DATABASE from "@/app/config/connection";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";

export async function GET(){
    await CONNECT_DATABASE();
    try{
        const body = await User.find();
        // console.log('login body',body);
        if(body.length > 0){

            return NextResponse.json({message:'Fetch User Data Successfully',resp:body},{status:200});
        }
        if(body.length == 0){
            return NextResponse.json({message:'Failed To Fetch Data'},{status:200});
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({message:'Internal Server Error'},{status:500});

    }
};

export async function POST(req) {
    try {
        await CONNECT_DATABASE();
        const body = await req.json();
        // console.log(body);
        const isUserExist = await User.findOne({ mobile: body.mobile })
        if (isUserExist) {
            return NextResponse.json({ message: 'This Mobile No Is Already Register' }, { status: 201 });
        }
        if (!isUserExist) {
            const toSave = await User({ ...body });
            const saved = await toSave.save();
            if (saved) {
                return NextResponse.json({ message: 'User Registered Successfully', resp: saved }, { status: 201 })
            } else {
                return NextResponse.json({ message: 'Failed To Submit' }, { status: 403 })
            }
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });

    }
}