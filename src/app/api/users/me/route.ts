import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET() {
    const cookie = cookies().get('memory_token');
    if (!cookie) {
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
    }
    const response = await axios
        .get(`http://15.164.190.1:8080/members/me`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((res) => {
            return res.data;
        });
    return NextResponse.json(response, { status: 200 });
}
