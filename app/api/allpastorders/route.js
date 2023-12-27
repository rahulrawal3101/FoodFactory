import CONNECT_DATABASE from "@/app/config/connection"
import PlaceOrder from "@/app/models/placeOderModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    await CONNECT_DATABASE();
    try {
        const res = await PlaceOrder.find(
            { $or: [{ orderStatus: 'Cancel By Admin' }, { orderStatus: 'Cancel By Customer' }, { orderStatus: 'Cancel By Merchant' }, { orderStatus: 'Cancel' }, { orderStatus: 'Rejected By Admin' }, { orderStatus: 'Rejected By Merchant' }] }
        );

        console.log('all past orders', res);
        if (res.length > 0) {
            return NextResponse.json({ message: 'Data Fetch Successfully', resp: res }, { status: 200 });
        }
        if (res.length == 0) {
            return NextResponse.json({ message: 'Failed To Fetch Data' }, { status: 200 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}