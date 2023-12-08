import CONNECT_DATABASE from "@/app/config/connection"
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
    // console.log('edit prifile data', params)
    await CONNECT_DATABASE();
    try {
        const body = await req.json();
        // console.log('name',body);
        const resp = await User.findOne({ _id: params.uid });
        // console.log('check resp Data ',resp);
        if (resp != null) {
            const editProfile = await User.findOneAndUpdate({ _id: params.uid }, { fullName: body.fullName, mobile: body.mobile, email: body.email });
            return NextResponse.json({ message: 'Profile Edit Successfully' }, { status: 200 });
        }
        if (resp == null) {
            return NextResponse.json({ message: 'Failed To Edit Profile' }, { status: 200 });
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });

    }

}