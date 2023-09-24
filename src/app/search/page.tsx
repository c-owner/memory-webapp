import SearchForm from '@/components/SearchForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export default async function SearchPage() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session) {
        redirect('/auth/signin?callbackUrl=/search');
    }

    return (
        <div className="mt-5">
            <h1>Search Page</h1>
            <SearchForm />
        </div>
    );
}
