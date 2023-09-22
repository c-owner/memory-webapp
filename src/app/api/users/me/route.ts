import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    console.log(email, password);
    const response = {
        message: 'Success',
        status: 200
    };
    return new Response(JSON.stringify(response), { status: 200 });
}
