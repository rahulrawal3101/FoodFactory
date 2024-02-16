import CONNECT_DATABASE from "@/app/config/connection";
import Shop from "@/app/models/shopModal";
import { NextResponse } from "next/server";
// import fsPromises from 'fs/promises';
import fsPromises from 'fs/promises'




export async function GET(req) {
    try {
        await CONNECT_DATABASE();
        const allshops = await Shop.find();
        if (allshops.length != 0) {
            return NextResponse.json({ message: 'All Data Fetch', resp: allshops }, { status: 200 });
        }
        if (allshops.length == 0) {
            return NextResponse.json({ message: 'Failed To Fetch Data' }, { status: 200 });
        }


    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }

};


// export async function POST(req) {
//     try {
//         await CONNECT_DATABASE();
//         const shopDetails = await req.json();
//         // console.log(shopDetails);
//         const schemas = Shop({ ...shopDetails });
//         const getData = await schemas.save();
//         // console.log('get Data', getData)
//         if (getData) {

//             return NextResponse.json({ message: 'Data Submit Successfully', resp: getData }, { status: 201 })
//         } else {
//             return NextResponse.json({ message: 'Failed To Connect' }, { status: 403 })

//         }

//     } catch (err) {
//         console.log(err);
//         return NextResponse.json({ message: 'Internal server error' }, { status: 500 })

//     }
// };

export const POST = async (req, { params }) => {
    // console.log('req shop data',req)
    await CONNECT_DATABASE();
    try {
        const body = await req.formData();
        // console.log('body data', body);
        const shopName = await body.get('shopName');
        const foodType = await body.get('foodType');
        const offPercentage = await body.get('offPercentage');
        const foodFormany = await body.get('foodFormany');
        const foodForCost = await body.get('foodForCost');
        const delivery = await body.get('delivery');
        const mobileShop = await body.get('mobileShop');
        const emailShop = await body.get('emailShop');
        const shopAddress = await body.get('shopAddress');
        const image = await body.get('image');
        if (image) {
            const buffered = await image.arrayBuffer();
            const buffer = await Buffer.from(await buffered);
            const fileName = Date.now() + image.name.replaceAll(" ", "_");
            const toSavePath = await process.cwd() + '/public/upload/' + fileName
            await fsPromises.writeFile(toSavePath, buffer);
            const shopDetails = {
                shopName: shopName,
                foodType: foodType,
                offPercentage: offPercentage,
                foodFormany: foodFormany,
                foodForCost: foodForCost,
                delivery: delivery,
                mobileShop: mobileShop,
                emailShop: emailShop,
                shopAddress: shopAddress,
                image: fileName
            }
            const toSave = await Shop(shopDetails);
            const saved = await toSave.save();
            if (saved) {
                return NextResponse.json({ message: 'Data Submit Successfully' }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Failed To Submit Data' }, { status: 200 })
            }
        } else {
            return NextResponse.json({ message: 'Please Upload Image Also' })
        }


    } catch (err) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }

}