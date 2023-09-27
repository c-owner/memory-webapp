import { RiBookmarkLine } from 'react-icons/ri';

type Props = {
    className?: string;
};
export default function BookmarkIcon({ className }: Props) {
    return <RiBookmarkLine className={className || 'w-6 h-6'} />;
}
