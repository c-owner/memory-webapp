import Avatar from '@/components/Avatar';

type Props = {
    image: string;
    memberName: string;
};
export default function PostUserAvatar({ image, memberName }: Props) {
    return (
        <div className="flex items-center p-2">
            <Avatar image={image} size="medium" highlight />
            <span className="text-gray-900 font-bold ml-2">{memberName}</span>
        </div>
    );
}
