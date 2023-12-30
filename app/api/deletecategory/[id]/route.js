import CONNECT_DATABASE from "@/app/config/connection"
import Categorie from "@/app/models/categoryModel";
import Item from "@/app/models/itemModel";
import { NextResponse } from "next/server";


export const DELETE = async (req, { params }) => {
    console.log('checking params id ', params)
    await CONNECT_DATABASE();
    try {
        // const mid = params.mid;
        const isCategoryExit = await Categorie.findOne({_id:params.id});
        // console.log('selected Category',isCategoryExit);
        if(isCategoryExit){
            const merchantItem = await Item.find({cid:isCategoryExit._id});
            console.log('find all item ',merchantItem)
            if(merchantItem.length > 0){
                 const deleteItem = await Item.deleteMany({cid:isCategoryExit._id})
                 console.log('delete items successfully',deleteItem);
                if(deleteItem){
                    const deleteCat = await Categorie.deleteOne({_id:isCategoryExit._id});
                    // console.log('cat delete successfully',deleteCat)
                    if(deleteCat){
                        return NextResponse.json({message:'Category Deleted Successfully'},{status:200});
                    }else{
                        return NextResponse.json({message:'Failed To Delete Category'},{status:200})
                    }
                }
                if(!deleteItem){
                    console.log('Failed To Datele Items')
                }
            }
            if(merchantItem.length == 0){
                const deleteCat = await Categorie.deleteOne({_id:isCategoryExit._id});
                if(deleteCat){
                    return NextResponse.json({message:'Category Deleted Successfully'},{status:200});
                }else{
                    return NextResponse.json({message:'Failed To Delete Category'})
                }
            }
            
        }else{
            return NextResponse.json({message:'No Category Found'},{status:200});
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}