import layout from '@/app/layout.module.css';
import LoginButton from '@/components/Login';
import RegisterButton from '@/components/Register';

export default function Footer() {
    return (
        <footer className={`${layout.footer} dark:border-none w-full p-3 flex justify-between items-center`}>
            <div className="mr-3">
                <LoginButton />
            </div>
            <RegisterButton />
        </footer>
    );
}
