import { AiOutlineDelete } from 'react-icons/ai';

type Props = {
    styleName?: string;
};
export default function DeleteIcon({ styleName = '' }: Props) {
    return <AiOutlineDelete className={`w-6 h-6 ${styleName}`} />;
}
