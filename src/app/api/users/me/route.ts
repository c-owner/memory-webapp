export async function GET() {
    const response = {
        message: 'GET Success',
        status: 200
    };
    return new Response(JSON.stringify(response), { status: 200 });
}
