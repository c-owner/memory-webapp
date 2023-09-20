type OAuthUser = {
    id: string;
    email: string;
    name: string;
    username: string;
    image?: string | null;
};

export async function addUser({ id, username, email, name, image }: OAuthUser) {
    console.log('addUser');
}
