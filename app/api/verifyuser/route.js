import CONNECT_DATABASE from "@/app/config/connection";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req){
    await CONNECT_DATABASE();
try{
    const body = await req.json();
    // console.log(body);
    const isUserExit = await User.findOne({email:body.email});
    // console.log(isUserExit)
    if(isUserExit){
        if(isUserExit.password == body.password){
            return NextResponse.json({message:'Login Successfull',resp:{uid:isUserExit._id}},{status:200});
            
        }
        if(isUserExit.password != body.password){
            return NextResponse.json({message:'Invalid Password'},{status:200});
        }
    }
    if(!isUserExit){
        return NextResponse.json({message:'This Mobile No is Not Registered'},{status:200});
    }


}catch(err){
console.log(err);
return NextResponse.json({message:'Internal Server Error'},{status:500});
}
};