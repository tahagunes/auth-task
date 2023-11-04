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
                <Link href="/">Home</Link>
            </div>
            <nav>
                {auth  ? (
                    <div style={{ flexDirection: "row" , padding: 10 }}>
                        <Link style={{ paddingLeft: 10 }} href="/posts">Posts</Link>
                        <Link style={{ paddingLeft: 10 }} href="/users">Users</Link>
                        <Link style={{ paddingLeft: 10 }} onClick={handleLogout} href="/login">Log Out</Link>
                    </div>
                ) : (
                    <Link href="/login">Login</Link>
                )}
            </nav>
        </header>
    );
}

export default Header;