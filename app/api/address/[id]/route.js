import CONNECT_DATABASE from "@/app/config/connection";
import Addres from "@/app/models/addressModel";
import { NextResponse } from "next/server";


export async function DELETE(req, { params }) {
    // console.log('delete', params)
    await CONNECT_DATABASE();
    try {
        const body = await Addres.deleteOne({ _id: params.id });
        if(body){

            return NextResponse.json({ message: 'Address Delete Successfully',resp:body }, { status: 201 })
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
};


export async function GET(req,{params}) {
    // console.log('user id',params)
    await CONNECT_DATABASE();
    try {
        const body = await Addres.find({uid:params.id});
        // console.log('get data',body);
        if(body.length != 0){
            return NextResponse.json({message:'Data Fetch Successfully',resp:body},{status:200});
        }
        if(body.length == 0){
            return NextResponse.json({message:'Failed To Fetch Data'},{status:200});
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({message:'Internal Server Error'},{status:500})
    }
}