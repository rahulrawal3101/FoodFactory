import CONNECT_DATABASE from "@/app/config/connection";
import Item from "@/app/models/itemModel";
import { NextResponse } from "next/server";


export async function GET(req,{params}) {
    try {
        await CONNECT_DATABASE();
        const getData = await Item.find({cid:params.cid});
        return NextResponse.json({mesage:'All Data Fetch',resp:getData})

    } catch (err) {
        console.log(err);
    }
}

export async function POST(req) {
    try {
        await CONNECT_DATABASE();
        const itemDetails = await req.json();
     
        const schemas = Item({ ...itemDetails });
        const itemData = await schemas.save();
        if (itemData) {
            return NextResponse.json({ message: 'Item Add Succesfully', resp: itemData }, { status: 201 });
        } else {
            return NextResponse.json({ message: 'Failed To Add Item' }, { status: 403 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }

};