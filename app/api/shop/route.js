import CONNECT_DATABASE from "@/app/config/connection";
import Shop from "@/app/models/shopModal";
import { NextResponse } from "next/server";




export async function GET(req) {
    try {
        await CONNECT_DATABASE();
        const allshops = await Shop.find();
        if (allshops.length != 0) {
            return NextResponse.json({ message: 'All Data Fetch', resp: allshops }, { status: 200 });
        }
        if (allshops.length == 0) {
            return NextResponse.json({ message: 'Failed To Fetch Data' }, { status: 200 });
        }


    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
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