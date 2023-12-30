import CONNECT_DATABASE from "@/app/config/connection";
import Categorie from "@/app/models/categoryModel";
import { NextResponse } from "next/server";
import fsPromises from 'fs/promises';
// const { NextResponse } = require("next/server");

export async function GET(req, { params }) {
    // console.log('cat param',params)
    try {
        await CONNECT_DATABASE();
        const allCat = await Categorie.find({ mid: params.mid });
        if (allCat.length > 0) {
            return NextResponse.json({ message: 'All Data Fetch', resp: allCat }, { status: 200 })
        }
        if (allCat.length == 0) {
            return NextResponse.json({ message: 'Failed To Fetch Data' }, { status: 200 })
        }


    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: 'internal Server Error' }, { status: 500 })
    }
}

// export async function POST(req){
//     try{
//         await CONNECT_DATABASE();
//         const catDetails = await req.json();

//         const schemas = Categorie({...catDetails});
//         const catData = await schemas.save();
//         if(catData){
//             return NextResponse.json({message:'Cat Add Successfully',resp:catData},{status:201})
//         }else{
//             return NextResponse.json({message:'Failed To Add Category'},{status:403})
//         }
//     }catch(err){
//         console.log(err);
//         return NextResponse.json({message:'Internal Server Error'}, {status:500})

//     }

// }

export const POST = async (req) => {
    await CONNECT_DATABASE();
    try {
        const body = await req.formData();
        const name = await body.get('name');
        const image = await body.get('image');
        const mid = await body.get('mid');
        if (image) {
            const buffered = await image.arrayBuffer();
            console.log('buffered img', buffered);
            const buffer = await Buffer.from(await buffered);
            const fileName = Date.now() + image.name.replaceAll(" ", "_");
            const toSavePath = await process.cwd() + '/public/upload/' + fileName
            await fsPromises.writeFile(toSavePath, buffer);
            const details = {
                name: name,
                mid: mid,
                image: fileName
            };
            const toSave = await Categorie(details);
            const saved = await toSave.save();
            if (saved) {
                return NextResponse.json({ message: 'Cat Add Successfully', resp: saved }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Failed To Add Category' }, { status: 200 })
            }
        } else {
            return NextResponse.json({ message: 'Please Upload Image Also' }, { status: 200 })
        }


    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }

}