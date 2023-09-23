import ReactDOM from 'react-dom';

type Props = {
    children: React.ReactNode;
};
export default function ModalPortal({ children }: Props) {
    if (typeof window === 'undefined') return null;

    const el = document.getElementById('portal') as Element;
    if (!el) return null;

    return ReactDOM.createPortal(children, el);
}
