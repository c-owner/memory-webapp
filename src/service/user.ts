type OAuthUser = {
    id: string;
    email: string;
    image?: string | null;
};

export async function newUser({ id, email, image }: OAuthUser) {
    const response = await fetch(`${process.env.API_DOMAIN}/members/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, id })
    }).then((res) => {
        return res.json();
    });
}
