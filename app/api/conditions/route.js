import connectMongoDB from "@/libs/mongodb";
import Condition from "@/models/condition";
import { NextResponse } from "next/server";

// add data to db
export async function POST(request) {
    const {name, medications} = await request.json();
    
    await connectMongoDB();
    await Condition.create({name, medications});
    return NextResponse.json(
        {message: "Condition created"},
        {status: 201}
        );
}

// get all data from db
export async function GET() {
    await connectMongoDB();
    const conditions = await Condition.find();
    return NextResponse.json(conditions);
}

// not really needed
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Condition.findByIdAndDelete(id);
    return NextResponse.json({message: "Condition deleted"}, {status: 200});
}

