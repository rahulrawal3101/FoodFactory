


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