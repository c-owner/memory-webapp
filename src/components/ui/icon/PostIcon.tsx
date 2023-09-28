import { MdGridOn } from 'react-icons/md';

type Props = {
    className?: string;
};
export default function PostIcon({ className }: Props) {
    return <MdGridOn className={className || 'w-3 h-3'} />;
}
