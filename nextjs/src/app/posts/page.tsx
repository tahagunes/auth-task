import PostsTable from "@/components/posts-table";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <div style={{ flexDirection: "row", backgroundColor: 'yellow' }}>
                <p>posts page</p>
                <Link style={{ paddingLeft: 10 }} href="/add-post">Add Post</Link>
            </div>
            <PostsTable />
        </main>
    );
}