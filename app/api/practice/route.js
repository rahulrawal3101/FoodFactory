import CONNECT_DATABASE from "@/app/config/connection"
import { NextResponse } from "next/server";
import fsPromises from 'fs/promises'

export const POST=async(req)=>{
await CONNECT_DATABASE();
try{
    const body = await req.formData();
    const image = await body.get('image');
    const title = await body.get('title');
    const desc = await body.get('desc');
    if(image){
        const buffered = await image.arrayBuffer();
        console.log('image convert in binary format',buffered);
        const buffer = await Buffer.from(await buffered);
        console.log('testing buffer',buffer);
        const fileName = Date.now()+image.name.replaceAll(" ","_");
        const toSavePath = await process.cwd()+'/public/upload/'+fileName
        await fsPromises.writeFile(toSavePath,buffer);
        const records = {
            title:title,
            desc:desc,
            image:image
        }
        const toSave = await PracTodo(records);
        const saved = await toSave.save();
        if(saved){
            return NextResponse.json({message:'Practice Todo Created Successfully'},{status:201});
        }else{
            return NextResponse.json({message:''})
        }

    }else{
        return NextResponse.json({message:'Image Not Found In Api'},{status:200})
    }

}catch(err){
    console.log(err);
    return NextResponse.json({message:'Internal Server Eror'},{status:500});
}
}