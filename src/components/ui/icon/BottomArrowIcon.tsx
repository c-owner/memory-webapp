import { BiSolidDownArrow } from 'react-icons/bi';

type Props = {
    color?: string;
};

export default function BottomArrowIcon({ color = 'text-indigo-300' }: Props) {
    return <BiSolidDownArrow className={`w-6 h-6 ${color}`} />;
}
