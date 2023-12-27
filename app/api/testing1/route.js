import CONNECT_DATABASE from "@/app/config/connection"
import Categorie from "@/models/categorieModel";
import Item from "@/models/itemModel";
import Shop from "@/models/shopmodel";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    await CONNECT_DATABASE();
    try {
        const mid = params.id;
        const isShopExists = await Shop.findOne({ _id: mid });
        console.log("shop exist", isShopExists);
        if (isShopExists) {
            const merchantMenu = await Item.find({ mid: isShopExists._id })
            console.log("merchant menu", merchantMenu);
            if (merchantMenu.length > 0) {
                const menuDeleted = await Item.deleteMany({ mid: isShopExists._id });
                console.log("deleted menu", menuDeleted);
                if (menuDeleted) {
                    const merchantCat = await Categorie.find({ mid: isShopExists._id });
                    if (merchantCat.length > 0) {
                        const deleteCategory = await Categorie.deleteMany({ mid: isShopExists._id });
                        if (deleteCategory) {
                            console.log("Categories Deleted Successfully")
                            const shopDeleted = await Shop.deleteOne({ _id: isShopExists._id });
                            if (shopDeleted) {
                                return NextResponse.json({ message: "Shop Deleted Successfully" }, { status: 200 })
                            }
                            else {
                                return NextResponse.json({ message: "Failed To Delete Shop" }, { status: 200 })
                            }
                        }
                        else {
                            console.log("Failed To Delete Categories");
                        }
                    }
                    if (merchantCat.length == 0) {
                        const shopDeleted = await Shop.deleteOne({ _id: isShopExists._id });
                        if (shopDeleted) {
                            return NextResponse.json({ message: "Shop Deleted Successfully" }, { status: 200 });
                        }
                        else {
                            return NextResponse.json({ message: "Failed To Delete Shop" }, { status: 200 });
                        }
                    }
                }
                if (!menuDeleted) {
                    console.log("Failed To Delete Items");
                }
            }
            if (merchantMenu.length == 0) {
                console.log("No Menu found");
                const merchantCat = await Categorie.find({ mid: isShopExists._id });
                console.log("categories", merchantCat);
                if (merchantCat.length > 0) {
                    const categoryDeleted = await Categorie.deleteMany({ mid: isShopExists._id });
                    console.log("category deleted", categoryDeleted);
                    if (categoryDeleted) {
                        const shopDeleted = await Shop.deleteOne({ _id: isShopExists._id });
                        if (shopDeleted) {
                            return NextResponse.json({ message: "Shop Deleted Successfully" }, { status: 200 })
                        }
                        else {
                            return NextResponse.json({ message: "Failed To Delete Shop" }, { status: 200 })
                        }
                    }
                    else {
                        console.log("Failed To Delete Category");
                    }
                }
                if (merchantCat.length == 0) {
                    console.log("No Categories Found");
                    const shopDeleted = await Shop.deleteOne({ _id: isShopExists._id });
                    console.log("Shop deleted", shopDeleted);
                    if (shopDeleted) {
                        return NextResponse.json({ message: "Shop Deleted Successfully" }, { status: 200 })
                    } else {
                        return NextResponse.json({ message: "Failed To Delete Shop" }, { status: 200 })
                    }
                }
            }
        }
        else {
            return NextResponse.json({ message: "Shop Not Found" }, { status: 200 })
        }

    }
    catch (err) {
        console.log(err.message);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}