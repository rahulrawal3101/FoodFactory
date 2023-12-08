import CONNECT_DATABASE from "@/app/config/connection";
import Item from "@/app/models/itemModel";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    await CONNECT_DATABASE();
    
    try {
        const deleted = await Item.deleteOne({ _id: params.id })
      
        if (deleted) {
            return NextResponse.json({ message: 'Item Deleted successfully' }, { status: 201 });
        }

    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
};