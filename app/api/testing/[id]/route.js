// import CONNECT_DATABASE from "@/app/config/connection";
// import Categorie from "@/app/models/categoryModel";
// import Item from "@/app/models/itemModel";
// import Shop from "@/app/models/shopModal";
// import { NextResponse } from "next/server";

// export const DELETE = async (req, { params }) => {
//     // console.log('delete shop with an id',params);
//     await CONNECT_DATABASE();
//     try {
//         const mid = params.id;
//         const isShopExists = await Shop.findOne({ _id: mid });
//         // console.log('find shop id',isShopExists);
//         if (isShopExists) {
//             const mercahntMenu = await Item.find({ mid: isShopExists._id });
//             // console.log('check merchant id ',mercahntMenu)
//             if (mercahntMenu.length > 0) {
//                 const deleteMenu = await Item.deleteMany({ mid: isShopExists._id });
//                 // console.log('delete item',deleteMenu);
//                 if (deleteMenu) {
//                     const merchantCat = await Categorie.find({ mid: isShopExists._id });
//                     // console.log('cat find with  mid id',merchantCat);
//                     if (merchantCat.length > 0) {
//                         const deleteCat = await Categorie.deleteMany({ mid: isShopExists._id });
//                         // console.log('delete cat id',deleteCat);
//                         if (deleteCat) {
//                             const deleteShop = await Shop.deleteOne({ _id: isShopExists._id });
//                             // console.log('delete shop from all shops', deleteShop);
//                             if (deleteShop) {
//                                 return NextResponse.json({ message: 'Shop Delete Successfully' }, { status: 200 })
//                             } else {
//                                 return NextResponse.json({ message: 'Failed To Delete Shop' }, { status: 200 })
//                             }

//                         } else {
//                             console.log('Failed To Delete Categories')
//                         }
//                     }
//                     if (merchantCat == 0) {
//                         const deleteShop = await Shop.deleteOne({ _id: isShopExists.id });
//                         if (deleteShop) {
//                             return NextResponse.json({ message: 'Shop Delete Successfully'}, { status: 200 })
//                         } else {
//                             return NextResponse.json({ message: 'Failed To Delete Shop' }, { status: 200 })
//                         }

//                     }
//                 }
//                 if (!deleteMenu) {
//                     console.log('Failed To Delete Item')
//                 }
//             }
//             if (mercahntMenu.length == 0) {
//                 console.log('No Items Found');
//                 const merchantCat = await Categorie.find({ mid: isShopExists._id });
//                 console.log('All Cat find with an id', merchantCat);
//                 if (merchantCat.length > 0) {
//                     const deleteCat = await Categorie.deleteMany({ mid: isShopExists._id });
//                     console.log('delete cat with == 0', deleteCat);
//                     if (deleteCat) {
//                         const deleteShop = await Shop.deleteOne({ _id: isShopExists._id });
//                         if (deleteShop) {
//                             return NextResponse.json({ message: 'Shop Delete Successfully' }, { status: 200 })
//                         } else {
//                             return NextResponse.json({ message: 'Failed To Delete Shop' }, { status: 200 })
//                         }

//                     }
//                     else {
//                         console.log('Failed To Delete Categories')
//                     }
//                 }
//                 if (mercahntMenu.length == 0) {
//                     console.log('No Categories Found');
//                     const deleteShop = await Shop.deleteOne({ _id: isShopExists._id })
//                     console.log('Shop delete', deleteShop);
//                     if (deleteShop) {
//                         return NextResponse.json({ message: 'Shop Delete Successfully' }, { status: 200 })
//                     } else {
//                         return NextResponse.json({ message: 'Failed to Delete Menu' },{status:200})
//                     }
//                 }

//             }
//         } else {
//             return NextResponse.json({ message: 'Something Wrong With Mid' }, { status: 200 });
//         }

//     } catch (err) {
//         console.log(err);
//         return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//     }
// }