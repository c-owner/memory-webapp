import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
    // const cookie = cookies().get('memory_token');
    // if (!cookie) {
    //     return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
    // }

    const newHeaders = req.headers;
    const response = await fetch(`${process.env.API_DOMAIN}/members/me`, {
        headers: newHeaders
    }).then((res) => {
        return res.json();
    });

    console.log('response', response);

    const { responseObject } = response;
    if (!responseObject) {
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
    }

    return NextResponse.json(response, { status: 200 });
}
