import Categorie from "@/app/models/categoryModel";
import Item from "@/app/models/itemModel";
import Shop from "@/app/models/shopModal";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    // console.log('delete shop id ',params)
    try {
        const mid = params.id;
        const isShopExists = await Shop.findOne({ _id: mid });
        // console.log('find shop with an id',isShopExists);
        if (isShopExists) {
            const merchantMenu = await Item.find({ mid: isShopExists._id });
            // console.log('All Item in a categories', merchantMenu);
            if (merchantMenu.length > 0) {
                const deleteItem = await Item.deleteMany({ mid: isShopExists._id });
                // console.log('delete item ',deleteItem)
                if (deleteItem) {
                    const merchantCat = await Categorie.find({ mid: isShopExists._id });
                    if (merchantCat.length > 0) {
                        const deleteCat = await Categorie.deleteMany({ mid: isShopExists._id });
                        console.log('delete cat', deleteCat)
                        if (deleteCat) {
                            console.log('Categories Delete Successfully');
                            const deleteShop = await Shop.deleteOne({ _id: isShopExists._id });
                            if (deleteShop) {
                                return NextResponse.json({ message: 'Shop Delete Successfully' }, { status: 200 })
                            } else {
                                return NextResponse.json({ message: 'Failed To Delete Shop' }, { status: 200 })
                            }
                        }
                    } else {
                        console.log('Failed To Delete Categories')
                    }
                    if (merchantCat.length == 0) {
                        const deleteShop = await Shop.deleteOne({ _id: isShopExists._id });
                        if (deleteShop) {
                            return NextResponse.json({ message: 'Shop Delete Successfully' }, { status: 200 })
                        } else {
                            return NextResponse.json({ message: 'Failed To Delete Shop' }, { status: 200 })
                        }

                    }
                }
                if (!deleteItem) {
                    console.log('Failed To Delete Item')
                }
            }
            if (merchantMenu.length == 0) {
                console.log('No Menu Found');
                const merchantCat = await Categorie.find({ mid: isShopExists._id });
                console.log('Categories merchant');
                if (merchantCat.length > 0) {
                    const deleteCat = await Categorie.deleteMany({ mid: isShopExists._id });
                    console.log('categories delete', deleteCat);
                    if (deleteCat) {
                        const deleteShop = await Shop.deleteOne({ _id: isShopExists._id });
                        if (deleteShop) {
                            return NextResponse.json({ message: 'Shop Delete Successfully' }, { status: 200 })
                        } else {
                            return NextResponse.json({ message: 'Failed To Delete Shop' }, { status: 200 })
                        }

                    } else {
                        console.log('Failed To Delete Categories')
                    }
                }
                if (merchantCat.length == 0) {
                    console.log('No Categories Found');
                    const deleteShop = await Shop.deleteOne({ _id: isShopExists._id });
                    console.log('shop delete successfully');
                    if (deleteShop) {
                        return NextResponse.json({ message: 'Shop Delete Successfully' }, { status: 200 });
                    } else {
                        return NextResponse.json({ message: 'Failed To Delete Shop' }, { status: 200 })
                    }

                }


            }
        } else {
            return NextResponse.json({ message: 'No Shop Found' }, { status: 200 })
        }



    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}