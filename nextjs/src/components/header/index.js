'use client'
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@nextui-org/react";
import Link from "next/link";
export function Header() {
    const { auth, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };
    return (
        <header>
            <div>
                <Link href="/">Logo</Link>
            </div>
            <nav>
                {auth ? (
                    <div>
                        <div>
                            <Link href="/posts">Posts</Link>
                        </div>
                        <div>
                            <Link href="/users">Users</Link>
                        </div>
                        <div>
                            <Button onClick={handleLogout}>Log Out</Button>
                        </div>
                    </div>
                ) : (
                    <Link href="/login">Login</Link>
                )}
            </nav>
        </header>
    );
}

export default Header;