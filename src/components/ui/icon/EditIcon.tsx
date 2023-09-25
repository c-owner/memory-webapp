import { AiOutlineEdit } from 'react-icons/ai';

type Props = {
    styleName?: string;
};
export default function EditIcon({ styleName = '' }: Props) {
    return <AiOutlineEdit className={`w-5 h-5 ${styleName}`} />;
}
