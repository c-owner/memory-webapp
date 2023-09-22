import EmailRegister from '@/components/auth/EmailRegister';

export default function SignUpPage() {
    return (
        <section className="w-full py-24 grid place-items-center h-full">
            <h1 className="text-3xl font-semibold">Register</h1>
            <EmailRegister />
        </section>
    );
}
