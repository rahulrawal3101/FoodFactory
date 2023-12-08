import CONNECT_DATABASE from "@/app/config/connection";
import Shop from "@/app/models/shopModal";
import { NextResponse } from "next/server";




export async function GET(req) {
    try {
        await CONNECT_DATABASE();
        const allshops = await Shop.find()
        return NextResponse.json({ message: 'All Data Fetch', resp: allshops })

    } catch (err) {
        console.log(err);

    }

};


export async function POST(req) {
    try {
        await CONNECT_DATABASE();
        const shopDetails = await req.json();
        // console.log(shopDetails);
        const schemas = Shop({ ...shopDetails });
        const getData = await schemas.save();
        // console.log('get Data', getData)
        if (getData) {

            return NextResponse.json({ message: 'Data Submit Successfully', resp: getData }, { status: 201 })
        } else {
            return NextResponse.json({ message: 'Failed To Connect' }, { status: 403 })

        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })

    }
};