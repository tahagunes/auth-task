'use client'
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export function Header() {
    const { auth, logout } = useAuth();
    const handleLogout = () => {
        logout();
    };


    return (
        <header style={{ backgroundColor: 'red' }}>
            <div>
                <nav>
                    {auth ? (
                        <div >
                            <Link href="/">Home</Link>
                            <Link style={{ paddingLeft: 10 }} href="/posts">Posts</Link>
                            <Link style={{ paddingLeft: 10 }} href="/users">Users</Link>
                            <Link style={{ paddingLeft: 10 }} onClick={handleLogout} href="/login">Log Out</Link>
                        </div>
                    ) : (
                        <div>
                            <Link href="/">Home</Link>
                            <Link style={{ paddingLeft: 10 }} href="/login">Login</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;