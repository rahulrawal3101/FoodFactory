// import CONNECT_DATABASE from "@/app/config/connection";
import { NextResponse } from "next/server";

export async function GET(req) {

    try {
        const orderStatus = ['Determined', 'Picked', 'UnDetermined', 'Pending', 'Placed', 'Accepted', 'Cooking', 'Preparing', 'Delivered', 'On The Way', 'Cancel By Admin', 'Cancel By Customer', 'Cancel By Merchant', 'Cancel', 'Rejected By Admin', 'Rejected By Merchant']
        // console.log(orderStatus);
        if (orderStatus) {
            return NextResponse.json({ message: 'Data Fetch Successfully', resp: orderStatus }, { status: 201 })
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}