import CloseIcon from '@/components/ui/icon/CloseIcon';
import DefaultButton from '@/components/ui/DefaultButton';

type Props = {
    onClose: () => void;
    children: React.ReactNode;
};
export default function DefaultAlert({ onClose, children }: Props) {
    return (
        <section
            role="presentation"
            className="fixed top-0 left-0 flex flex-col items-center w-full h-full z-50 bg-neutral-900/70"
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    // 브라우저API, 외부 섹션 태그를 클릭했을 경우 모달을 닫는다.
                    onClose();
                }
            }}
        >
            <div
                className="relative top-[3rem] w-4/5 h-2/5 rounded-md shadow-2xl
            max-w-xl max-h-md bg-neutral-100 dark:bg-apple-dark-2 dark:text-white"
            >
                <div className="absolute w-full h-full p-3">
                    <button
                        className="absolute top-0 right-0 p-3 dark:text-black"
                        onClick={() => onClose()}
                    >
                        <CloseIcon />
                    </button>
                    <div className="flex flex-col items-center justify-center h-3/5">
                        {children}
                    </div>
                    <div className="flex gap-6 flex-row items-center justify-center w-full">
                        <DefaultButton text={`OK`} w_size="w-1/3" onClick={() => onClose()} />
                    </div>
                </div>
            </div>
        </section>
    );
}
