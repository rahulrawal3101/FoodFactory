import CONNECT_DATABASE from "@/app/config/connection";
import Item from "@/app/models/itemModel";
import { NextResponse } from "next/server";
import fsPromises from  'fs/promises'


export async function GET(req,{params}) {
    try {
        await CONNECT_DATABASE();
        const getData = await Item.find({cid:params.cid});
        if(getData.length > 0){
            return NextResponse.json({message:'All Data Fetch',resp:getData},{status:200})
        }
        if(getData.length == 0){
            return NextResponse.json({message:'Failed To Fetch Data'},{status:200})
        }


    } catch (err) {
        console.log(err);
        return NextResponse.json({message:'Internal Server Error'},{status:500})
    }
}

// export async function POST(req) {
//     try {
//         await CONNECT_DATABASE();
//         const itemDetails = await req.json();
     
//         const schemas = Item({ ...itemDetails });
//         const itemData = await schemas.save();
//         if (itemData) {
//             return NextResponse.json({ message: 'Item Add Succesfully', resp: itemData }, { status: 201 });
//         } else {
//             return NextResponse.json({ message: 'Failed To Add Item' }, { status: 403 });
//         }
//     } catch (err) {
//         console.log(err);
//         return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//     }

// };

export const POST=async(req)=>{
  await CONNECT_DATABASE();
  try{
    const body = await req.formData();
    // console.log('items data',body);
    const name = await body.get('name');
    const cid = await body.get('cid');
    const mid = await body.get('mid');
    const mrp = await body.get('mrp');
    const srp = await body.get('srp');
    const foodType = await body.get('foodType');
    const image = await body.get('image');
    if(image){
        const buffered = await image.arrayBuffer();
    //    console.log('hello img ',buffered);
       const buffer = await Buffer.from(await buffered);
    //    console.log('buffered', buffer);
       const fileName = Date.now()+image.name.replaceAll(" ","_");
    //    console.log('fileName',fileName);
       const toSavePath = await process.cwd()+'/public/upload/'+ fileName;
       await fsPromises.writeFile(toSavePath,buffer);
    //    console.log('to save path', toSavePath);
    const itemDetails = {
        name:name,
        cid:cid,
        mid:mid,
        mrp:mrp,
        srp:srp,
        foodType:foodType,
        image:fileName
    }
    const toSave = await Item(itemDetails);
    const saved = await toSave.save();
    if(saved){
        return NextResponse.json({message:'Item Add Succesfully'},{status:200})
    }else{
        return NextResponse.json({message:'Failed To Add Item'},{status:200})
    }
    }

  }catch(err){
    console.log(err);
    return NextResponse.json({message:'Internal Server Error'},{status:500});
  }
}