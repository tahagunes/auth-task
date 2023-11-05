import UsersTable from "@/components/users-table";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <div style={{ flexDirection: "row", backgroundColor: 'yellow' }}>
                <p>users page</p>
                <Link style={{ paddingLeft: 10 }} href="/add-user">Add User</Link>
            </div>
            <UsersTable />
        </main>
    );
}