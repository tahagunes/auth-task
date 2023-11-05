import FormPropsAddUserFields from '@/components/add-user-form'
export default function Home() {
    return (
        <main>
            <div style={{ flexDirection: "row", backgroundColor: 'yellow' }}>
                <p>add user page</p>
            </div>
            <FormPropsAddUserFields />
        </main>
    );
}