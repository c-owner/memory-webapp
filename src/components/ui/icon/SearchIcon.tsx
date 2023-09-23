import { RiSearchLine } from 'react-icons/ri';

type Props = {
    color?: string;
};
export default function SearchIcon({ color = 'text-indigo-300' }: Props) {
    return <RiSearchLine className={`w-6 h-6 ${color}`} />;
}
