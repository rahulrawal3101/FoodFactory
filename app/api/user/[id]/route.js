import CONNECT_DATABASE from "@/app/config/connection";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    // console.log('user delete', params)
    await CONNECT_DATABASE();
    try {
        const body = await User.deleteOne({ _id: params.id });
        if (body) {

            return NextResponse.json({ message: 'User Delete successfully', resp: body }, { status: 201 })
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}