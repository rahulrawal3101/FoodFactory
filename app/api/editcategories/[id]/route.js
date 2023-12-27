import CONNECT_DATABASE from "@/app/config/connection"
import Categorie from "@/app/models/categoryModel";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
    // console.log('params id cat', params)
    await CONNECT_DATABASE();
    try {
        const body = await req.json();
        // console.log('body categories', body);
        const res = await Categorie.findOneAndUpdate({ _id: params.id }, { isAvailable: body.isAvailable }, { new: true });
        // console.log('res cat id', res);
        if (res) {
            return NextResponse.json({ message: 'Category Updated Successfully',resp:res }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Failed To Update Category' }, { status: 200 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}