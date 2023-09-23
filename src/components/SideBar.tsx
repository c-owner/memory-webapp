import Avatar from '@/components/Avatar';
import { AuthUser } from '@/model/user';

type Props = {
    user: AuthUser;
};
export default function SideBar({ user: { image, memberName } }: Props) {
    return (
        <>
            <div className="flex items-center">
                {image && <Avatar image={image} />}
                <div className="ml-4">
                    <p className="font-bold">{memberName}</p>
                    <p className="text-lg text-neutral-500 leading-4">{memberName}</p>
                </div>
            </div>
            <p className="text-sm text-neutral-500 mt-8">
                About • Help • Privacy • Terms • Location • Language
            </p>
            <p className="font-bold text-sm mt-8 text-neutral-500">©Copyright MEMORY, Inc.</p>
        </>
    );
}
