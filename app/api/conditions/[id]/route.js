import connectMongoDB from "@/libs/mongodb";

import Condition from "@/models/condition";
import { NextResponse } from "next/server";

// needs to implement such that only boolean list for each medication is updated
export async function PUT(request, {params}) {
    const {id} = params;
    const {name, medications} = await request.json();
    await connectMongoDB();
    await Condition.findByIdAndUpdate(id, {medications});
    return NextResponse.json({message: "Condition data updated"}, {status: 200});
}


// find one condition by ID
export async function GET(request, {params}) {
    const {id} = params;
    await connectMongoDB();
    const condition = await Condition.findById(id);
    return NextResponse.json(condition);
}