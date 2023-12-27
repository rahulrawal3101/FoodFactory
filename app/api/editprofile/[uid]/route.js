import CONNECT_DATABASE from "@/app/config/connection"
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
    // console.log('edit prifile data', params)
    await CONNECT_DATABASE();
    try {
        const body = await req.json();
        // console.log('nameeeee',body);
        const res = await User.findOne({ _id: params.uid });
        // console.log('check resp Data ',res);
        if (res != null) {
            const editProfile = await User.findOneAndUpdate({ _id: params.uid }, { fullName: body.fullName, mobile: body.mobile, email: body.email },{new:true});
            return NextResponse.json({ message: 'Profile Edit Successfully',resp:res }, { status: 200 });
        }
        if (res == null) {
            return NextResponse.json({ message: 'Failed To Edit Profile' }, { status: 200 });
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });

    }

}