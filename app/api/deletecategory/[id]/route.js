import CONNECT_DATABASE from "@/app/config/connection";
import Categorie from "@/app/models/categoryModel";
import Item from "@/app/models/itemModel";
import { NextResponse } from "next/server";


export async function DELETE(req, { params }) {
    // console.log('cat delete mid', params);
    await CONNECT_DATABASE();
    try {
        const deletedCat = await Categorie.deleteOne({ _id: params.id });
        const deleteItem = await Item.deleteMany({cid:params.id});
        
        const findCat = await Categorie.find({_id:params.id});
        const finditem = await Item.find({cid:params.id});
        if (deletedCat && deleteItem ) {
            return NextResponse.json({ message: 'Category Deleted Successfully' }, { status: 201 });
        }


    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });

    }
};