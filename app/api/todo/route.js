// import CONNECT_DATABASE from "@/app/config/connection"
// import { NextResponse } from "next/server";
import fsPromises from 'fs/promises';

import CONNECT_DATABASE from "@/app/config/connection"
import { NextResponse } from "next/server";
import Todo from '@/app/models/todo';

// import CONNECT_DATABASE from "@/app/config/connection"
// import { NextResponse } from "next/server";

// export const POST =async(req)=>{
//     console.log('checking response',req)
//     await CONNECT_DATABASE();
//     try{
//         const body = await req.formData();
//         const image = body.get('image');
//         if(image){
//             const buffered = await image.arrayBuffer();
//             const buffer = await Buffer.from(await buffered);
//             const fileName = Date.now()+image.name.replaceAll(" ","_");
//             const toSavepath = await process.cwd()+'/public/upload/'+fileName;
//             await fsPromises.writeFile(toSavepath,buffer);




//         }else{
//             console.log('Image Not Found in Api.')
//         }

//     }catch(err){
//         console.log(err);
//         return NextResponse.json({message:'Internal Server Error'},{status:500})
//     }
// }









// export const POST = async (req) => {
//     await START_DATABASE();
//     try {
//         // const rec = await req.json();
//         const formData = await req.formData();
//         const file = formData.get('myFile');
//         if (file) {
//             const fileBufferArray = await file.arrayBuffer();
//             const buffer = Buffer.from(await fileBufferArray);
//             const filename = Date.now() + file.name.replaceAll(" ", "_");

//             const pathToSave = await path.join(process.cwd(), 'public/uploads', filename);
//             await writeFile(pathToSave, buffer);
//             const toSave = Empl({
//                 name: formData.get('name'),
//                 designation: formData.get('designation'),
//                 reportMonth: formData.get('resportMonth'),
//                 reportYear: formData.get('reportYear'),
//                 image: filename
//             });
//             const saved = toSave.save();
//             if(saved){
//                 return NextResponse.json({ message: 'Action Performed Successfully', response : saved});
//             }
//             if(!saved){
//                 return NextResponse.json({ message: 'Failed To Save Data' });
//             }


//             console.log('Array Buffer', fileBufferArray);
//             console.log('Final Buffer', buffer);
//             console.log('FileName', filename);
//             console.log('pathToSave', pathToSave);
//         }
//         if (!file) {
//             return NextResponse.json({ message: 'Plz Updoad Image' });
//         }
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//     }
// };

// const nextConfig = {
//     distDir: 'build',
//     images:{
//         domains:["codebrain.codes","jsonplaceholder.typicode.com","upload.wikimedia.org"]
//     }
// }

// module.exports = nextConfig



// export const POST=async(req)=>{
// await CONNECT_DATABASE();
// try{
//     const body = await req.formData();
//     const image = await body.get('image');
//     if(image){
//         const buffered = await image.arrayBuffer();
//         const buffer = await Buffer.from(await buffered);
//         const fileName = Date.now()+image.name.replaceAll(" ","_");
//         const toSavePath = await process.cwd()+'/public/upload/'+ fileName;
//         await fsPromises.writeFile(toSavePath,buffer)
//     }else{
//         console.log('Image Not Found in Api')
//     }

// }catch(err){
// console.log(err);
// return NextResponse.json({message:'Internal Server Error'},{status:500})
// }
// }


export const POST = async (req) => {
    await CONNECT_DATABASE();
    try {
        const body = await req.formData();
        const image = await body.get('image');
        const title = await body.get('title');
        const desc = await body.get('desc');
        if (image) {
            const buffered = await image.arrayBuffer();
            // console.log('bufferde testing',buffered);
            const buffer = await Buffer.from(await buffered);
            // console.log('buffer checking',buffer)
            const fileName = Date.now() + image.name.replaceAll(" ", "_");
            // console.log('file name saving ',fileName)
            const toSavePath = await process.cwd() + '/public/upload/' + fileName;
            await fsPromises.writeFile(toSavePath, buffer);
            const record = {
                title: title,
                desc: desc,
                image: fileName
            };
            const toSave = await Todo(record);
            const saved = await toSave.save();
            if (saved) {
                return NextResponse.json({ message: "Todo Created Successfully" }, { status: 201 })
            }
            else {
                return NextResponse.json({ message: "Failed To Create Todo" }, { status: 200 })
            }
        } else {
            return NextResponse.json({ message: "Please Upload Image Also" }, { status: 200 })
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}

export const GET = async(req)=>{
    await CONNECT_DATABASE();
    try{
        const allTodos = await Todo.find();
        return NextResponse.json({message:'All Todo Records',resp : allTodos},{status:200})
    }catch(err){
        return NextResponse.json({message : "Internal Server Error"},{status:500});
    }
}