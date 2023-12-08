import CONNECT_DATABASE from "@/app/config/connection";
import Addres from "@/app/models/addressModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    await CONNECT_DATABASE();
    try {
        const body = await req.json();
        // console.log('body data',body)
        const toSave =await Addres(body);
        // console.log('data check',toSave)
        const saved = await toSave.save();
        // console.log('all item', saved);
        if (saved != null) {

            return NextResponse.json({ message: 'Address Add Successfully' }, { status: 200 });
        }
        if(saved == null){
            return NextResponse.json({ message: 'Address Not Added' }, { status: 200 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })

    }

};