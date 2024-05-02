import connectMongoDB from "@/libs/mongodb";
import Condition from "@/models/condition";
import { NextResponse } from "next/server";

// Middleware-like behavior within API handler to force HTTPS
const ensureHttps = (req) => {
    const proto = req.headers.get("x-forwarded-proto");
    if (proto && proto !== "https") {
        const url = new URL(req.url);
        url.protocol = 'https:';
        return NextResponse.redirect(url.toString(), 301);
    }
    return null;
}

export async function PUT(request, { params }) {
    const httpsRedirect = ensureHttps(request);
    if (httpsRedirect) return httpsRedirect;

    const { id } = params;
    const { name, medications } = await request.json();
    await connectMongoDB();
    await Condition.findByIdAndUpdate(id, { medications });
    return NextResponse.json({ message: "Condition data updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const httpsRedirect = ensureHttps(request);
    if (httpsRedirect) return httpsRedirect;

    const { id } = params;
    await connectMongoDB();
    const condition = await Condition.findById(id);
    return NextResponse.json(condition);
}
